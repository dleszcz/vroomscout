'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  RefreshCw,
  Clock,
  Zap,
  ChevronDown,
  Check,
  FileText,
  ShieldCheck,
  Info,
} from 'lucide-react';
import {
  BrandConfig,
  LeadFormState,
  VehicleCategory,
  VehicleCondition,
  FuelType,
  CompressedPhoto,
} from '@/types/scout';
import { compressImageClientSide } from '@/lib/image-compressor';
import { submitScoutLead } from '@/lib/lead-submission';
import { CAR_DATABASE, ALL_MAKES, YEAR_OPTIONS } from '@/config/cars-database';
import { validatePhoneNumber } from '@/lib/anti-spam';

interface ScoutWizardProps {
  brand: BrandConfig;
  onOpenLegal: (tab: 'terms' | 'privacy') => void;
  initialCity?: string;
  initialCondition?: VehicleCondition;
  initialCategory?: VehicleCategory;
}

const INITIAL_FORM: LeadFormState = {
  category: 'osobowe',
  make: '',
  model: '',
  makeAndModel: '',
  year: '2014',
  fuel: 'diesel',
  condition: 'bardzo_dobry',
  noInsurance: false,
  noMot: false,
  conditionNotes: '',
  expectedPriceAmount: '',
  isNegotiable: true,
  priceBracket: '',
  city: '',
  name: '',
  phone: '',
  consentDataSharing: false,
  consentPhoneContact: false,
};

export const ScoutWizard: React.FC<ScoutWizardProps> = ({
  brand,
  onOpenLegal,
  initialCity,
  initialCondition,
  initialCategory,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<LeadFormState>(() => ({
    ...INITIAL_FORM,
    ...(initialCity ? { city: initialCity } : {}),
    ...(initialCondition ? { condition: initialCondition } : {}),
    ...(initialCategory ? { category: initialCategory } : {}),
  }));
  const [photos, setPhotos] = useState<CompressedPhoto[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState<string>('');
  const formStartedAt = useRef<number>(0);
  const lastStepChangeAt = useRef<number>(0);

  useEffect(() => {
    formStartedAt.current = Date.now();
    lastStepChangeAt.current = Date.now();
  }, []);

  // Autocomplete UI state
  const [makeQuery, setMakeQuery] = useState<string>('');
  const [modelQuery, setModelQuery] = useState<string>('');
  const [showMakeDropdown, setShowMakeDropdown] = useState<boolean>(false);
  const [showModelDropdown, setShowModelDropdown] = useState<boolean>(false);
  const makeRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;

  // 1. Silently restore draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vroom_scout_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          queueMicrotask(() => {
            setFormData((prev) => ({
              ...prev,
              ...parsed,
              ...(initialCity ? { city: initialCity } : {}),
              ...(initialCondition ? { condition: initialCondition } : {}),
              ...(initialCategory ? { category: initialCategory } : {}),
              consentDataSharing: Boolean(parsed.consentDataSharing),
              consentPhoneContact: Boolean(parsed.consentPhoneContact),
            }));
            if (parsed.make) setMakeQuery(parsed.make);
            if (parsed.model) setModelQuery(parsed.model);
          });
        }
      }
    } catch {
      // ignore
    }
  }, [initialCategory, initialCity, initialCondition]);

  // 2. Persist draft changes
  useEffect(() => {
    if (isSubmitted) return;
    try {
      localStorage.setItem('vroom_scout_draft', JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData, isSubmitted]);

  // Close autocomplete dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (makeRef.current && !makeRef.current.contains(e.target as Node)) {
        setShowMakeDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const updateField = <K extends keyof LeadFormState>(field: K, value: LeadFormState[K]) => {
    setErrorMsg(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Filtered makes list
  const filteredMakes = ALL_MAKES.filter((m) =>
    m.toLowerCase().includes((makeQuery || '').toLowerCase().trim())
  );

  // Available models for currently selected or typed make
  const matchedMakeKey = ALL_MAKES.find(
    (m) => m.toLowerCase() === (formData.make || makeQuery || '').toLowerCase().trim()
  );
  const availableModels = matchedMakeKey ? CAR_DATABASE[matchedMakeKey] || [] : [];
  const filteredModels = availableModels.filter((mod) =>
    mod.toLowerCase().includes((modelQuery || '').toLowerCase().trim())
  );

  const handleSelectMake = (makeName: string) => {
    setMakeQuery(makeName);
    updateField('make', makeName);
    updateField('model', '');
    setModelQuery('');
    updateField('makeAndModel', makeName);
    setShowMakeDropdown(false);
    // Open model dropdown
    setShowModelDropdown(true);
  };

  const handleSelectModel = (modelName: string) => {
    setModelQuery(modelName);
    updateField('model', modelName);
    updateField('makeAndModel', `${formData.make || makeQuery} ${modelName}`.trim());
    setShowModelDropdown(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setErrorMsg(null);
    setIsCompressing(true);

    const remainingSlots = 6 - photos.length;
    const selectedFiles = Array.from(e.target.files).slice(0, remainingSlots);

    try {
      const compressedList: CompressedPhoto[] = [];
      for (const file of selectedFiles) {
        if (!file.type.startsWith('image/')) continue;
        const compressed = await compressImageClientSide(file);
        compressedList.push(compressed);
      }
      setPhotos((prev) => [...prev, ...compressedList]);
    } catch (err) {
      console.error('Photo compression error:', err);
      setErrorMsg('Wystąpił problem podczas przetwarzania zdjęć. Spróbuj ponownie.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Step validation
  const validateCurrentStep = (): boolean => {
    setErrorMsg(null);

    if (step === 1) {
      const finalMake = formData.make || makeQuery;
      if (!finalMake.trim()) {
        setErrorMsg('Wybierz lub wpisz markę samochodu.');
        return false;
      }
      if (!formData.year) {
        setErrorMsg('Wybierz rok produkcji.');
        return false;
      }
      if (!formData.fuel) {
        setErrorMsg('Zaznacz rodzaj paliwa.');
        return false;
      }
      // Ensure makeAndModel is synced
      const finalModel = formData.model || modelQuery;
      updateField('make', finalMake);
      updateField('model', finalModel);
      updateField('makeAndModel', `${finalMake} ${finalModel}`.trim());
      return true;
    }

    if (step === 2) {
      if (!formData.condition) {
        setErrorMsg('Zaznacz orientacyjny stan techniczny pojazdu.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      // Step 3 is price & photos - both optional or flexible
      return true;
    }

    if (step === 4) {
      if (!formData.city.trim() || formData.city.trim().length < 2) {
        setErrorMsg('Wpisz miejscowość lub miasto odbioru auta.');
        return false;
      }
      const phoneCheck = validatePhoneNumber(formData.phone);
      if (!phoneCheck.isValid) {
        setErrorMsg(phoneCheck.error || 'Wpisz poprawny numer telefonu komórkowego.');
        return false;
      }
      if (!formData.consentDataSharing || !formData.consentPhoneContact) {
        setErrorMsg('Zaznacz wymagane zgody formalne, aby partner mógł przedstawić bezpłatną wycenę.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateCurrentStep()) {
      setErrorMsg(null);
      lastStepChangeAt.current = Date.now();
      setStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setErrorMsg(null);
    lastStepChangeAt.current = Date.now();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Prevent accidental submit bleed if user double-clicked "Dalej" on step 3 (within 400ms)
    if (Date.now() - lastStepChangeAt.current < 400) {
      return;
    }
    if (step < totalSteps) {
      handleNext();
      return;
    }
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const filledDurationMs = Date.now() - formStartedAt.current;
      const result = await submitScoutLead(formData, brand.domainName, photos, {
        honeypot,
        filledDurationMs,
      });
      if (result.success) {
        setIsSubmitted(true);
        setSubmittedLeadId(result.leadId || '');
        localStorage.removeItem('vroom_scout_draft');
      } else {
        setErrorMsg(result.error || 'Wystąpił błąd podczas wysyłania zgłoszenia.');
      }
    } catch (err: unknown) {
      console.error('Lead submit error:', err);
      setErrorMsg('Błąd połączenia. Sprawdź internet i spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setPhotos([]);
    setStep(1);
    setIsSubmitted(false);
    setSubmittedLeadId('');
    setErrorMsg(null);
    setMakeQuery('');
    setModelQuery('');
    setHoneypot('');
    formStartedAt.current = Date.now();
    localStorage.removeItem('vroom_scout_draft');
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
      {/* SUCCESS SCREEN */}
      {isSubmitted ? (
        <div className="p-6 sm:p-10 text-center space-y-6 animate-fade-in-scale">
          <div
            className={`w-20 h-20 mx-auto rounded-3xl ${brand.lightBgClass} ${brand.primaryTextClass} flex items-center justify-center text-3xl font-extrabold shadow-inner`}
          >
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${brand.accentBadgeClass}`}
            >
              <Zap className="w-3.5 h-3.5" /> Zgłoszenie przyjęte
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Dziękujemy! Twoje auto trafia do wyceny.
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Otrzymaliśmy dane Twojego pojazdu. Przekazujemy je bezpośrednio do zweryfikowanego
              partnera, który przygotuje konkretne widełki odkupu.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-2 border-b border-slate-200/80">
              <span>Identyfikator zgłoszenia</span>
              <span className="font-mono text-slate-800">
                #{submittedLeadId.slice(-8).toUpperCase()}
              </span>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <div
                className={`p-2 rounded-xl ${brand.lightBgClass} ${brand.primaryTextClass} shrink-0 mt-0.5`}
              >
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-bold text-slate-900 text-sm">
                  Kontakt z propozycją cenową
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Partner skontaktuje się z Tobą telefonicznie lub SMS-em z wstępną kwotą odkupu.
                  Oględziny i odbiór auta odbywają się pod Twoim domem.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Wyceniaj kolejne auto
            </button>
            <a
              href="#jak-to-dziala"
              className={`w-full sm:w-auto px-6 py-3 rounded-xl ${brand.primaryBtnTextClass || 'text-white font-bold'} text-xs shadow-md ${brand.primaryBgClass} ${brand.primaryHoverClass} transition-colors`}
            >
              Zobacz jak wygląda odbiór i płatność →
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === totalSteps) {
              handleSubmit(e);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const target = e.target as HTMLElement;
              if (target.tagName === 'INPUT') {
                e.preventDefault();
                if (step < totalSteps) {
                  handleNext();
                } else {
                  handleSubmit(e);
                }
              }
            }
          }}
          className="flex flex-col relative"
        >
          {/* Honeypot field for bot trapping */}
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-hidden="true"
          >
            <label htmlFor="company_fax">Leave this field blank</label>
            <input
              id="company_fax"
              type="text"
              name="company_fax"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {/* Progress Header */}
          <div className="px-4 sm:px-8 pt-4 sm:pt-7 pb-3.5 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${brand.primaryBgClass} animate-pulse-subtle`}
                />
                Krok {step} z {totalSteps}
              </span>
              <span className="text-slate-400 font-semibold">
                {step === 1 && 'Krok 1: Dane pojazdu'}
                {step === 2 && 'Krok 2: Stan i opłaty'}
                {step === 3 && 'Krok 3: Cena i zdjęcia'}
                {step === 4 && 'Krok 4: Odbiór wyceny'}
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full ${brand.primaryBgClass} rounded-full transition-all duration-300 ease-out shadow-xs`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Form Body */}
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in-scale">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ========================================================
                KROK 1: MARKA, MODEL, ROK I PALIWO
            ======================================================== */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-scale">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Jaki samochód chcesz wycenić?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Wybierz markę i model z listy lub wpisz ręcznie, jeśli nie ma na liście.
                  </p>
                </div>

                {/* Szybki przełącznik typu auta: Osobowe vs Bus */}
                <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => updateField('category', 'osobowe')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.category !== 'bus'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>Osobowe / SUV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('category', 'bus')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.category === 'bus'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Dostawczy / Bus</span>
                  </button>
                </div>

                {/* MARKA & MODEL INPUTS WITH AUTOCOMPLETE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. MARKA AUTOCOMPLETE */}
                  <div ref={makeRef} className="relative">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Marka pojazdu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="np. Volkswagen, Audi, Ford..."
                        value={makeQuery || formData.make}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMakeQuery(val);
                          updateField('make', val);
                          updateField('makeAndModel', `${val} ${formData.model}`.trim());
                          setShowMakeDropdown(true);
                        }}
                        onFocus={() => setShowMakeDropdown(true)}
                        className="w-full h-12 sm:h-14 px-4 pr-10 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors"
                      />
                      <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {showMakeDropdown && filteredMakes.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl divide-y divide-slate-100">
                        {filteredMakes.map((makeItem) => (
                          <div
                            key={makeItem}
                            onClick={() => handleSelectMake(makeItem)}
                            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <span>{makeItem}</span>
                            {formData.make === makeItem && (
                              <Check className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. MODEL AUTOCOMPLETE */}
                  <div ref={modelRef} className="relative">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Model pojazdu
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={
                          formData.make
                            ? `Model dla ${formData.make} (np. Passat, Golf)`
                            : 'Wpisz model...'
                        }
                        value={modelQuery || formData.model}
                        onChange={(e) => {
                          const val = e.target.value;
                          setModelQuery(val);
                          updateField('model', val);
                          updateField(
                            'makeAndModel',
                            `${formData.make || makeQuery} ${val}`.trim()
                          );
                          setShowModelDropdown(true);
                        }}
                        onFocus={() => setShowModelDropdown(true)}
                        className="w-full h-12 sm:h-14 px-4 pr-10 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors"
                      />
                      <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {showModelDropdown && filteredModels.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl divide-y divide-slate-100">
                        {filteredModels.map((modelItem) => (
                          <div
                            key={modelItem}
                            onClick={() => handleSelectModel(modelItem)}
                            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between"
                          >
                            <span>{modelItem}</span>
                            {formData.model === modelItem && (
                              <Check className="w-4 h-4 text-emerald-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ROK PRODUKCJI – CZYSTY SELECT BEZ LOSOWYCH PRZYCISKÓW */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Rok produkcji <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.year}
                      onChange={(e) => updateField('year', e.target.value)}
                      className="w-full h-12 sm:h-14 px-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" disabled>
                        Wybierz rok produkcji
                      </option>
                      {YEAR_OPTIONS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* RODZAJ PALIWA */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Rodzaj paliwa <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'benzyna', label: 'Benzyna' },
                      { id: 'diesel', label: 'Diesel' },
                      { id: 'lpg', label: 'Benzyna + LPG' },
                      { id: 'hybryda_elektryk', label: 'Hybryda / EV' },
                    ].map((item) => {
                      const active = formData.fuel === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => updateField('fuel', item.id as FuelType)}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer text-center ${
                            active
                              ? `${brand.primaryBorderClass} ${brand.lightBgClass} ${brand.primaryTextClass} shadow-xs font-extrabold`
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                KROK 2: STAN TECHNICZNY I STATUS OPŁAT
            ======================================================== */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in-scale">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Stan techniczny i opłaty
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Określ ogólną sprawność oraz czy auto posiada ważne ubezpieczenie i przegląd.
                  </p>
                </div>

                {/* 1. STAN OGÓLNY POJAZDU */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
                    Orientacyjny stan samochodu <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'bardzo_dobry',
                        title: '✨ Sprawny / do jazdy',
                        desc: 'Silnik i skrzynia pracują bez zarzutu, auto gotowe do trasy.',
                      },
                      {
                        id: 'drobne_poprawki',
                        title: '🔧 Drobne poprawki',
                        desc: 'Rysy, wgniotki, luzy w zawieszeniu lub kosmetyka wnętrza.',
                      },
                      {
                        id: 'wymaga_naprawy',
                        title: '⚠️ Uszkodzony mechanicznie',
                        desc: 'Uszkodzony silnik, sprzęgło, dwumasa lub elektronika (odpala lub nie).',
                      },
                      {
                        id: 'niesprawny',
                        title: '🛑 Powypadkowy / Po kolizji',
                        desc: 'Uszkodzenia blacharskie po stłuczce lub po zderzeniu.',
                      },
                    ].map((item) => {
                      const active = formData.condition === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            updateField('condition', item.id as VehicleCondition)
                          }
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            active
                              ? `${brand.primaryBorderClass} ${brand.lightBgClass} shadow-xs`
                              : 'border-slate-200/90 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-slate-900 text-sm">
                              {item.title}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                active
                                  ? `${brand.primaryBorderClass} ${brand.primaryBgClass}`
                                  : 'border-slate-300'
                              }`}
                            >
                              {active && <Check className="w-3 h-3 text-white stroke-[3]" />}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. STATUS OPŁAT: BRAK OC / BRAK PRZEGLĄDU */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-800">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span>Status opłat i dokumentów</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Zaznacz, jeśli auto nie posiada ważnych opłat. Partnerzy dysponują autolawetami i odbiorą samochód bez problemu.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.noInsurance}
                        onChange={(e) => updateField('noInsurance', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        Brak ważnego ubezpieczenia OC
                      </span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.noMot}
                        onChange={(e) => updateField('noMot', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        Brak ważnego badania technicznego (przeglądu)
                      </span>
                    </label>
                  </div>
                </div>

                {/* 3. OPIS USTEREK LUB WYPOSAŻENIA */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                    Dodatkowe informacje (opcjonalnie)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="np. stuka dwumasa, świeci się check engine, auto stało rok w garażu, opony zimowe..."
                    value={formData.conditionNotes}
                    onChange={(e) => updateField('conditionNotes', e.target.value)}
                    className="w-full p-3.5 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* ========================================================
                KROK 3: OCZEKIWANA KWOTA I ZDJĘCIA
            ======================================================== */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in-scale">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Oczekiwana kwota i zdjęcia
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Podaj kwotę, jaką chciałbyś uzyskać lub zostaw puste – partner zaproponuje bezpłatną kwotę odkupu od ręki.
                  </p>
                </div>

                {/* OCZEKIWANA KWOTA & NEGOCJACJE */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Twoja oczekiwana kwota (zł)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="np. 15000 (lub zostaw puste)"
                        value={formData.expectedPriceAmount}
                        onChange={(e) => updateField('expectedPriceAmount', e.target.value)}
                        className="w-full h-12 sm:h-14 px-4 pr-12 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">
                        PLN
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNegotiable}
                        onChange={(e) => updateField('isNegotiable', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">
                        Cena do rozsądnej negocjacji
                      </span>
                    </label>

                    {formData.expectedPriceAmount && (
                      <button
                        type="button"
                        onClick={() => updateField('expectedPriceAmount', '')}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline"
                      >
                        Wyczyść kwotę
                      </button>
                    )}
                  </div>

                  {/* Transparent educational callout (Retail vs Trade Buyout) */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-700 flex items-start gap-2.5 shadow-xs">
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-extrabold text-slate-900 block text-xs">
                        Wycena odkupu dla handlu zawodowego
                      </span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Cena odkupu od ręki przez skup/komis jest z reguły nieco niższa niż maksymalna cena detaliczna z portali ogłoszeniowych (gdzie auto wisi średnio miesiąc). W zamian otrzymujesz <strong>gotówkę od ręki w 24h</strong>, darmowy odbiór lawetą i zwolnienie z rękojmi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ZDJĘCIA POJAZDU (OPCJONALNE) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      Zdjęcia samochodu (opcjonalnie, max 6)
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {photos.length}/6 załączonych
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Zdjęcia nie są obowiązkowe, ale pozwalają partnerowi od razu podać wyższą i pewniejszą kwotę odkupu.
                  </p>

                  {/* Photo Thumbnails */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group shadow-xs"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.previewUrl}
                            alt="Podgląd auta"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(photo.id)}
                            className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-white hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {photos.length < 6 && (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="wizard-photos-input"
                      />
                      <label
                        htmlFor="wizard-photos-input"
                        className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-3 cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition-colors"
                      >
                        <Upload className="w-5 h-5 text-slate-500" />
                        <span className="text-xs sm:text-sm font-bold text-slate-700">
                          {isCompressing
                            ? 'Optymalizowanie zdjęć...'
                            : 'Dodaj zdjęcia z telefonu'}
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================
                KROK 4: KONTAKT I ODBIÓR WYCENY
            ======================================================== */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in-scale">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Gdzie przekazać propozycję wyceny?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Podaj numer telefonu do kontaktu. Twoje zgłoszenie trafia bezpośrednio do jednego dopasowanego partnera.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* NUMER TELEFONU */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Numer telefonu kontaktowego <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="np. 600 123 456"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full h-12 sm:h-14 px-4 pl-11 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-extrabold text-base focus:border-slate-900 focus:outline-none transition-colors"
                      />
                      <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* MIEJSCOWOŚĆ */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                      Miejscowość lub kod pocztowy <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="np. Warszawa, Poznań, 87-800..."
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className="w-full h-12 sm:h-14 px-4 pl-11 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors"
                      />
                      <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* IMIĘ – W 100% OPCJONALNE */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                        Imię <span className="text-slate-400 font-normal">(opcjonalnie)</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Nie musisz podawać nazwiska
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="np. Tomasz (opcjonalnie)"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full h-12 sm:h-14 px-4 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-sm sm:text-base focus:border-slate-900 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* ZGODY PRAWNE (RODO / PKE) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Zgody prawne i ochrona danych (RODO / PKE)</span>
                    </div>
                    {(!formData.consentDataSharing || !formData.consentPhoneContact) && (
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg(null);
                          setFormData((prev) => ({
                            ...prev,
                            consentDataSharing: true,
                            consentPhoneContact: true,
                          }));
                        }}
                        className="text-[11px] font-bold text-slate-700 hover:text-black underline cursor-pointer"
                      >
                        Zaznacz obie zgody
                      </button>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.consentDataSharing}
                      onChange={(e) => updateField('consentDataSharing', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Zgadzam się na przekazanie powyższych danych do jednego zweryfikowanego Partnera w celu sporządzenia bezpłatnej propozycji odkupu auta, zgodnie z{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenLegal('privacy');
                        }}
                        className="underline font-bold text-slate-900 hover:text-black cursor-pointer"
                      >
                        Polityką Prywatności
                      </button>
                      .
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.consentPhoneContact}
                      onChange={(e) => updateField('consentPhoneContact', e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 shrink-0"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Wyrażam zgodę na kontakt telefoniczny oraz SMS w celu przedstawienia wyceny pojazdu (zgodnie z Prawem Komunikacji Elektronicznej).
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* DOLNY PASEK NAWIGACJI DLA KROKÓW 1-4 */}
          <div className="px-4 sm:px-8 py-3.5 sm:py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                key="wizard-prev-btn"
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Wstecz</span>
              </button>
            ) : (
              <div className="text-[11px] font-semibold text-slate-400">
                Krok 1 z {totalSteps}
              </div>
            )}

            {step < totalSteps ? (
              <button
                key="wizard-next-btn"
                type="button"
                onClick={handleNext}
                className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl ${brand.primaryBtnTextClass || 'text-white'} font-extrabold text-sm sm:text-base shadow-md ${brand.primaryBgClass} ${brand.primaryHoverClass} transition-all active:scale-98 cursor-pointer ml-auto`}
              >
                <span>Dalej</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                key="wizard-submit-btn"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl ${brand.primaryBtnTextClass || 'text-white'} font-extrabold text-sm sm:text-base shadow-lg ${brand.primaryBgClass} ${brand.primaryHoverClass} disabled:opacity-50 transition-all active:scale-98 cursor-pointer ml-auto`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Wysyłanie zgłoszenia...</span>
                  </>
                ) : (
                  <>
                    <span>Odbierz bezpłatną wycenę</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
