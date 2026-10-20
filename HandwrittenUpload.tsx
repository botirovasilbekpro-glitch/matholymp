import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  PenTool, 
  Camera, 
  X, 
  SwitchCamera,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface HandwrittenUploadProps {
  imagePreview: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export const HandwrittenUpload: React.FC<HandwrittenUploadProps> = ({
  imagePreview,
  onImageChange,
}) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'draw'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  // Camera stream state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraLoading, setCameraLoading] = useState(false);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Stop camera when unmounting or leaving camera mode
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setErrorMsg(null);
    setCameraLoading(true);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Fallback to native capture input if getUserMedia is unavailable
        nativeCameraInputRef.current?.click();
        setCameraLoading(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      // Fallback directly to native camera file input
      if (nativeCameraInputRef.current) {
        nativeCameraInputRef.current.click();
      } else {
        setErrorMsg("Kameraga ulanishda xatolik yuz berdi. Iltimos, fayl yuklash usulidan foydalaning.");
        setActiveMode('upload');
      }
    } finally {
      setCameraLoading(false);
    }
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = video.videoWidth || 1280;
    captureCanvas.height = video.videoHeight || 720;
    const ctx = captureCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    const dataUrl = captureCanvas.toDataURL('image/jpeg', 0.92);
    
    stopCamera();
    onImageChange(dataUrl);
    setActiveMode('upload');
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const processFile = (file: File) => {
    setErrorMsg(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
      setErrorMsg("Faqat rasm formatidagi (JPEG, PNG, WebP) fayllar qabul qilinadi.");
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("Fayl hajmi 15 MB dan oshmasligi kerak.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Canvas drawing methods
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#14062B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvasDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onImageChange(dataUrl);
    setActiveMode('upload');
  };

  return (
    <div className="bg-[#190A35] border border-[#3B1D63] rounded-2xl p-5 shadow-lg space-y-4">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2C134E] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Daftardagi yechimni rasmga olish / topshirish
            </h4>
            <span className="text-[11px] text-purple-300">
              Qog‘ozga yozilgan yechimni suratga tushirib AI ga yuboring
            </span>
          </div>
        </div>

        {/* 3 Mode buttons */}
        <div className="flex items-center gap-1.5 bg-[#120626] p-1 rounded-xl border border-[#3B1D63] text-xs">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveMode('upload');
            }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeMode === 'upload'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Fayl tanlash</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('camera');
              startCamera();
            }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeMode === 'camera'
                ? 'bg-gradient-to-r from-[#E879F9] to-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-pink-300" />
            <span>Kamera (Suratga olish)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveMode('draw');
            }}
            className={`px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 ${
              activeMode === 'draw'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Chizish</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* MODE 1: Live Camera Snapshot Tool */}
      {activeMode === 'camera' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-[#E879F9] shadow-2xl flex items-center justify-center min-h-[320px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto max-h-[380px] object-cover"
            />

            {/* Viewfinder Overlay Frame */}
            <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded-xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between text-[11px] text-white/90 bg-black/60 px-2.5 py-1 rounded backdrop-blur self-start font-medium">
                📖 Daftaringizdagi yechimni to‘rtburchak ichiga to‘g‘rilang
              </div>
              <div className="text-[11px] text-white/80 text-center bg-black/60 px-3 py-1 rounded backdrop-blur self-center">
                Yorug‘lik yaxshi tushganiga va formulalar aniq ko‘ringaniga ishonch hosil qiling
              </div>
            </div>

            {/* Camera switch & close buttons */}
            <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={toggleCameraFacing}
                className="p-2 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur border border-white/20 transition"
                title="Kamerani almashtirish (Old/Orqa)"
              >
                <SwitchCamera className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setActiveMode('upload');
                }}
                className="p-2 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur border border-white/20 transition"
                title="Kamerani yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shutter Capture Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleCapturePhoto}
              disabled={cameraLoading}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#E879F9] via-[#A855F7] to-[#7C3AED] hover:opacity-95 shadow-xl shadow-purple-900/50 flex items-center gap-2 transition active:scale-95"
            >
              <Camera className="w-5 h-5 text-white" />
              <span>Daftarni suratga olish (Rasmga tushirish)</span>
            </button>

            <button
              type="button"
              onClick={() => nativeCameraInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl text-xs text-purple-300 hover:text-white bg-[#120626] border border-[#3B1D63] transition flex items-center gap-1.5"
            >
              <span>Telefon kamerasi orqali</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: Virtual Scratchpad Canvas */}
      {activeMode === 'draw' && (
        <div className="space-y-3 animate-fadeIn">
          <p className="text-xs text-purple-300">
            Sensorli ekranda yoki sichqoncha yordamida formulalarni va geometrik chizmani to‘g‘ridan-to‘g‘ri chizing:
          </p>
          <div className="border-2 border-[#7C3AED]/60 rounded-xl overflow-hidden bg-[#14062B]">
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-56 cursor-crosshair touch-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={clearCanvas}
              className="px-3 py-1.5 bg-[#251045] hover:bg-[#341663] text-purple-300 rounded-lg text-xs transition"
            >
              Tozalash
            </button>
            <button
              type="button"
              onClick={saveCanvasDrawing}
              className="px-4 py-1.5 bg-gradient-to-r from-[#7C3AED] to-[#E879F9] text-white font-medium rounded-lg text-xs hover:opacity-90 transition shadow-md"
            >
              Chizmani yechimga biriktirish
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: Upload / Image Preview */}
      {activeMode === 'upload' && (
        <>
          {imagePreview ? (
            <div className="space-y-3 animate-fadeIn">
              <div className="relative rounded-xl overflow-hidden border-2 border-[#7C3AED]/70 bg-[#120626] max-h-80 flex items-center justify-center p-3">
                <img
                  src={imagePreview}
                  alt="Daftardagi yechim surati"
                  className="max-h-72 object-contain rounded-lg shadow-md cursor-pointer hover:opacity-95"
                  onClick={() => setZoomModalOpen(true)}
                  title="Kattalashtirib ko‘rish uchun bosing"
                />
                
                {/* Image controls overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#10051F]/90 backdrop-blur-md p-1.5 rounded-xl border border-[#3B1D63] shadow-lg">
                  <button
                    type="button"
                    onClick={() => setZoomModalOpen(true)}
                    className="p-1.5 text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition"
                    title="To‘liq ekranda ko‘rish"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-purple-200 hover:text-white hover:bg-purple-900/50 rounded-lg transition"
                    title="Boshqa rasm bilan almashtirish"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onImageChange(null)}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition"
                    title="Rasmni o‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Daftardagi yechim surati biriktirildi. AI (Vision) uni to‘liq o‘qib tekshiradi.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomModalOpen(true)}
                  className="text-[11px] underline font-semibold text-emerald-200 hover:text-white"
                >
                  Kattalashtirish
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Quick direct actions row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode('camera');
                    startCamera();
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-950/40 border-2 border-dashed border-[#E879F9]/50 hover:border-[#E879F9] transition flex flex-col items-center justify-center gap-2 group text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#E879F9] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">1. Daftarni rasmga olish</h5>
                    <p className="text-[11px] text-purple-300 mt-0.5">Kamerani ochib qog‘ozdagi yechimni suratga oling</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-2xl bg-[#14062B]/50 hover:bg-[#1A0A38] border-2 border-dashed border-[#3B1D63] hover:border-[#7C3AED] transition flex flex-col items-center justify-center gap-2 group text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#261049] text-[#A855F7] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">2. Galereyadan rasm tanlash</h5>
                    <p className="text-[11px] text-purple-300 mt-0.5">Telefon yoki kompyuterdan rasm faylini yuklang</p>
                  </div>
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-[#E879F9] bg-[#7C3AED]/15'
                    : 'border-[#3B1D63] hover:border-[#7C3AED]/80 bg-[#120626]/40'
                }`}
              >
                <p className="text-xs text-purple-300">
                  yoki rasm faylini bu yerga sudrab tashlang (JPEG, PNG, WebP — maksimal 15 MB)
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Fullscreen Zoom Modal */}
      {zoomModalOpen && imagePreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setZoomModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setZoomModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-pink-400 p-2"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imagePreview}
              alt="Daftardagi yechim to‘liq ko‘rinishi"
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl border border-purple-500/40"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
