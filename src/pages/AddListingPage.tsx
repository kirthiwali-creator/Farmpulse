import React, { useState } from 'react';
import { 
  PlusCircle, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Image as ImageIcon 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG, MANDI_RECORDS } from '../data/mockData';

export const AddListingPage: React.FC = () => {
  const { addListing, setActiveTab, setSelectedCropId } = useApp();
  const [cropId, setCropId] = useState('onion');
  const [variety, setVariety] = useState('Garva High-Pungency Red');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(100);
  const [expectedPrice, setExpectedPrice] = useState<number>(2800);
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Export)' | 'Grade B (Standard)' | 'Grade C (Fair)'>('Grade A (Export)');
  const [moisturePercent, setMoisturePercent] = useState<number>(11.5);
  const [storageCondition, setStorageCondition] = useState<'Warehouse / Cold Storage' | 'Farm Shed' | 'Open Yard'>('Warehouse / Cold Storage');
  const [harvestDate, setHarvestDate] = useState('2026-09-04');
  const [availableUntil, setAvailableUntil] = useState('2026-10-31');
  const [uploadedImageName, setUploadedImageName] = useState<string | null>('hubli_red_onion_lot_01.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCrop = CROPS_CATALOG.find(c => c.id === cropId) || CROPS_CATALOG[0];
  const benchmarkMandi = MANDI_RECORDS.find(m => m.cropId === cropId) || MANDI_RECORDS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addListing({
        cropId,
        cropName: selectedCrop.name,
        variety,
        quantityQuintals: Number(quantityQuintals),
        expectedPricePerQuintal: Number(expectedPrice),
        qualityGrade,
        moisturePercent: Number(moisturePercent),
        storageCondition,
        harvestDate,
        availableUntil,
        status: 'Available'
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      setSelectedCropId(cropId);
      setActiveTab('marketplace');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post Harvest for Direct Buyers</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
          List Your Harvest in 1 Minute
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Publish your crop details. Verified FPOs, institutional buyers, and food processors across India are instantly alerted.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Crop Selection */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">1</span>
              <span>Crop & Variety Details</span>
            </h2>
            <span className="text-[11px] text-stone-400">Step 1 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Crop Name *
              </label>
              <select
                value={cropId}
                onChange={(e) => {
                  setCropId(e.target.value);
                  const crop = CROPS_CATALOG.find(c => c.id === e.target.value);
                  if (crop) {
                    const mandi = MANDI_RECORDS.find(m => m.cropId === crop.id);
                    if (mandi) setExpectedPrice(Math.round(mandi.modalPrice * 1.08));
                  }
                }}
                className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none"
              >
                {[
                  { group: 'Flowers & Floriculture', cat: 'Flower' },
                  { group: 'Plantation & Nuts', cat: 'Plantation' },
                  { group: 'Medicinal & Herbs', cat: 'Medicinal' },
                  { group: 'Vegetables & Gourds', cat: 'Vegetable' },
                  { group: 'Fruits', cat: 'Fruit' },
                  { group: 'Spices & Condiments', cat: 'Spice' },
                  { group: 'Pulses & Dals', cat: 'Pulse' },
                  { group: 'Oilseeds', cat: 'Oilseed' },
                  { group: 'Cereals & Millets', cat: 'Cereal' },
                  { group: 'Commercial & Cash Crops', cat: 'Commercial' },
                ].map(({ group, cat }) => {
                  const cropsInCat = CROPS_CATALOG.filter(c => c.category === cat);
                  if (cropsInCat.length === 0) return null;
                  return (
                    <optgroup key={cat} label={`── ${group} (${cropsInCat.length}) ──`}>
                      {cropsInCat.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.hindiName})
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Variety / Specification *
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Garva Red, JS-335, Sharbati Golden"
                className="w-full text-xs border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none focus:border-emerald-600"
                required
              />
            </div>
          </div>

          {/* Mandi Benchmark Pill */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Current APMC Benchmark ({benchmarkMandi.mandiName}):</span>
              </span>
              <p className="text-[11px] text-stone-600">
                Modal market price is <strong>₹{benchmarkMandi.modalPrice}/Q</strong> (Range: ₹{benchmarkMandi.minPrice} - ₹{benchmarkMandi.maxPrice})
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400">Suggested Direct Asking</span>
              <div className="font-extrabold text-emerald-800 text-sm">
                ₹{Math.round(benchmarkMandi.modalPrice * 1.06)} - ₹{Math.round(benchmarkMandi.modalPrice * 1.14)} / Q
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Quantity & Expected Price */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">2</span>
              <span>Quantity & Pricing Terms</span>
            </h2>
            <span className="text-[11px] text-stone-400">Step 2 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Quantity Available (Quintals) *
              </label>
              <input
                type="number"
                min="5"
                max="5000"
                value={quantityQuintals}
                onChange={(e) => setQuantityQuintals(Number(e.target.value))}
                className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none"
                required
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                1 Quintal = 100 kg ({quantityQuintals / 10} Metric Tonnes)
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Expected Price (₹ / Quintal) *
              </label>
              <input
                type="number"
                min="500"
                max="50000"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(Number(e.target.value))}
                className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none"
                required
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Total Batch Value: <strong className="text-emerald-700">₹{(quantityQuintals * expectedPrice).toLocaleString('en-IN')}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Quality & Photo */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">3</span>
              <span>Quality Assurance & Storage</span>
            </h2>
            <span className="text-[11px] text-stone-400">Step 3 of 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Quality Grade *
              </label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
                className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none"
              >
                <option value="Grade A (Export)">Grade A (Export Quality)</option>
                <option value="Grade B (Standard)">Grade B (Standard Market)</option>
                <option value="Grade C (Fair)">Grade C (Fair Average Quality)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Moisture Content ({moisturePercent}%)
              </label>
              <input
                type="range"
                min="8"
                max="18"
                step="0.5"
                value={moisturePercent}
                onChange={(e) => setMoisturePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-2"
              />
              <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                Optimal warehouse range: 10% - 13%
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Current Storage
              </label>
              <select
                value={storageCondition}
                onChange={(e) => setStorageCondition(e.target.value as any)}
                className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none"
              >
                <option value="Warehouse / Cold Storage">Warehouse / Cold Storage</option>
                <option value="Farm Shed">Ventilated Farm Shed</option>
                <option value="Open Yard">Open Yard</option>
              </select>
            </div>
          </div>

          {/* Photo Upload Box */}
          <div className="p-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-stone-900">
                  {uploadedImageName ? uploadedImageName : 'Upload Harvest Photos'}
                </div>
                <div className="text-[11px] text-stone-500">
                  Photos allow buyers to verify color uniformity, grading, and bulb size directly.
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Farmpulse AI Quality Rating: <strong>94/100 (Grade A Verified)</strong></span>
                </div>
              </div>
            </div>

            <label className="px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedImageName(e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-102 flex items-center gap-2"
          >
            {isSubmitting ? (
              <span>Publishing Harvest Batch...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish to Marketplace</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
