import './App.css';

export function App() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 font-sans">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center border border-slate-100">
                <div className="flex justify-center mb-6">
                    <div className="relative w-24 h-24 bg-linear-to-tr from-sky-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                        {/* A clean, abstract NeutralinoJS-inspired geometric icon */}
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
                    NeutralinoJS + React
                </h1>
                
                <p className="text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full px-4 py-1.5 inline-block mb-6">
                    Vite + TypeScript + Tailwind CSS v4
                </p>

                <div className="space-y-4 text-slate-600 mb-8 text-left bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="flex items-start">
                        <span className="shrink-0 flex items-center justify-center w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mr-3 mt-0.5">✓</span>
                        <p className="text-sm">Window position and dimensions are persisted automatically.</p>
                    </div>
                    <div className="flex items-start">
                        <span className="shrink-0 flex items-center justify-center w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mr-3 mt-0.5">✓</span>
                        <p className="text-sm">Lightweight, portable desktop application framework.</p>
                    </div>
                    <div className="flex items-start">
                        <span className="shrink-0 flex items-center justify-center w-5 h-5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mr-3 mt-0.5">✓</span>
                        <p className="text-sm">Press <kbd className="bg-white px-2 py-0.5 rounded border border-slate-200 text-xs font-mono shadow-xs">F12</kbd> or right-click to open developer tools.</p>
                    </div>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                    to-diag-trace-ne v1.0.0
                </div>
            </div>
        </div>
    );
}
