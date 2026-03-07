import { useEffect, useState } from "react";

const PassGen = () => {
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(5);
  const [strength, setStrength] = useState("strong");

  // my state varibales

  let [checkNum, setCheckNum] = useState(false);
  let [checkUpperCase, setCheckUpperCase] = useState(false);
  let [checkLowerCase, setCheckLowerCase] = useState(false);
  let [checkSymbol, setCheckSymbol] = useState(false);
  let [checkAmbiguous, setCheckAmbiguous] = useState(false);
  let [password, setPassword] = useState("");

  const strengthConfig = {
    weak: { label: "Weak", bars: 1, color: "bg-red-500", glow: "shadow-red-500/40" },
    medium: { label: "Fair", bars: 2, color: "bg-amber-400", glow: "shadow-amber-400/40" },
    strong: { label: "Strong", bars: 3, color: "bg-emerald-400", glow: "shadow-emerald-400/40" },
    ultra: { label: "Ultra", bars: 4, color: "bg-cyan-400", glow: "shadow-cyan-400/40" },
  };

  const currentStrength = strengthConfig[strength];

  const createPassword = () => {
    let nums = [1, 2, 3, 4];
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', "h", 'i', 'j', 'k'];

    // step -1: Combine into one pool/String;
    let pool = nums.join('') + chars.join('');

    if(checkNum) {
      pool += "0123456789";
    }

    if(checkUpperCase){
      pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(checkLowerCase){
      pool += "abcdefghijklmnopqrstuvwxyz";
    }

    if(checkSymbol){  
      pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if(checkAmbiguous){
      pool += "O0Il1|"
    }

    let mixedPass = "";

    for (let i = 0; i < length; i++) {
      let randIdx = Math.floor(Math.random() * pool.length);
      mixedPass += pool[randIdx];
    }
    setPassword(mixedPass);
  }


  useEffect(() => {
    createPassword();
  }, [length, checkNum,checkLowerCase,checkSymbol,checkUpperCase, checkAmbiguous]);


  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)",
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00f5ff, transparent)", top: "10%", left: "15%" }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)", bottom: "20%", right: "10%" }}
        />
      </div>

      <div className="relative w-full max-w-lg">

        {/* Main card */}
        <div
          className="rounded-2xl p-6 border border-zinc-800/60 backdrop-blur-sm"
          style={{ background: "rgba(13,17,23,0.95)", boxShadow: "0 0 60px rgba(0,245,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          {/* Password Output */}
          <div className="mb-6">
            <label className="text-zinc-500 text-xs uppercase tracking-widest mb-2 block">Generated Password</label>
            <div
              className="relative rounded-xl border border-zinc-700/50 p-4 group transition-all duration-300 hover:border-cyan-500/30"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="text-lg font-bold text-white tracking-widest flex-1 truncate select-all"
                  style={{ fontFamily: "'Courier New', monospace", textShadow: "0 0 20px rgba(0,245,255,0.3)" }}
                >
                  {password || "P@ssw0rd!"}
                </span>
                <div className="flex gap-2 shrink-0">
                  {/* Refresh */}
                  <button
                    onClick={createPassword}
                    className="cursor-pointer w-9 h-9 rounded-lg border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    title="Regenerate"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  {/* Copy */}
                  <button
                    onClick={() => setCopied(true)}
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${copied
                      ? "border-emerald-500/60 text-emerald-400 bg-emerald-500/10"
                      : "border-zinc-700 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50"
                      }`}
                    style={{ background: copied ? undefined : "rgba(255,255,255,0.03)" }}
                    title="Copy"
                  >
                    {copied ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Strength indicator bar */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStrength.bars ? currentStrength.color : "bg-zinc-800"
                        }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-bold tracking-wider ${strength === "weak" ? "text-red-400" :
                  strength === "medium" ? "text-amber-400" :
                    strength === "strong" ? "text-emerald-400" : "text-cyan-400"
                  }`}>
                  {currentStrength.label}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800/60 mb-6" />

          {/* Length Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-zinc-400 text-xs uppercase tracking-widest">Length</label>
              <span className="text-cyan-400 text-sm font-bold tabular-nums">{length} chars</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={5}
                max={15}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  // calculate percentage based on actual min/max so 5→0% and 15→100%
                  background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((length - 5) / (15 - 5)) * 100}%, #27272a ${((length - 5) / (15 - 5)) * 100}%, #27272a 100%)`,
                  WebkitAppearance: "none",
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-zinc-700 text-xs">8</span>
              <span className="text-zinc-700 text-xs">64</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="mb-6">
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-3 block">Include</label>
            <div className="grid grid-cols-2 gap-2">
              <ToggleOption
                label="Uppercase"
                hint="A-Z"
                on={checkUpperCase}
                setOn={setCheckUpperCase}
              />

              <ToggleOption
                label="Lowercase"
                hint="a-z"
                on={checkLowerCase}
                setOn={setCheckLowerCase}
              />

              <ToggleOption
                label="Numbers"
                hint="0-9"
                on={checkNum}
                setOn={setCheckNum}
              />

              <ToggleOption
                label="Symbols"
                hint="!@#$"
                on={checkSymbol}
                setOn={setCheckSymbol}
              />
            </div>
          </div>

          {/* Exclude Ambiguous */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/60 cursor-pointer group hover:border-zinc-700/60 transition-all"
              style={{ background: "rgba(0,0,0,0.25)" }}
            >
              <div>
                <p className="text-zinc-300 text-sm font-medium">Exclude ambiguous chars</p>
                <p className="text-zinc-600 text-xs mt-0.5">Removes 0, O, l, I, 1</p>
              </div>
              <ToggleSwitch setAmb={setCheckAmbiguous} checkAmbiguous={checkAmbiguous} />
            </div>
          </div>

          {/* Presets */}
          {/* <div className="mb-6">
            <label className="text-zinc-400 text-xs uppercase tracking-widest mb-3 block">Quick Presets</label>
            <div className="flex gap-2 flex-wrap">
              {["PIN", "WPA2", "Strong", "Passphrase"].map((preset) => (
                <button
                  key={preset}
                  className="px-3 py-1.5 rounded-lg border border-zinc-700/60 text-zinc-400 text-xs hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div> */}

          {/* Generate Button */}
          <button
          onClick={createPassword}
            className="w-full py-4 rounded-xl font-black text-sm tracking-[0.2em] uppercase text-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #06b6d4)",
              boxShadow: "0 0 30px rgba(34,211,238,0.3), 0 4px 15px rgba(0,0,0,0.4)",
              letterSpacing: "0.2em",
            }}
          >
            Generate Password
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-700 text-xs mt-6 tracking-wider">
          Passwords are generated locally · Never transmitted
        </p>
      </div>

      {/* Slider thumb styling */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 10px rgba(34,211,238,0.5);
          cursor: pointer;
          border: 2px solid #0a0a0f;
        }
        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 10px rgba(34,211,238,0.5);
          cursor: pointer;
          border: 2px solid #0a0a0f;
        }
      `}</style>
    </div>
  );
};

const ToggleOption = ({ label, hint, on, setOn }) => {
  return (
    <div
      onClick={() => setOn(!on)}
      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${on
          ? "border-cyan-500 bg-cyan-500/10"
          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40"
        }`}
    >
      <div>
        <p className={`text-sm font-medium ${on ? "text-white" : "text-zinc-400"}`}>
          {label}
        </p>
        <p className="text-xs text-zinc-500">{hint}</p>
      </div>

      {/* Checkbox */}
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${on
            ? "border-cyan-400 bg-cyan-400"
            : "border-zinc-700"
          }`}
      >
        {on && (
          <svg
            className="w-3 h-3 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const ToggleSwitch = ({ setAmb, checkAmbiguous }) => {
  return (
    <button
      onClick={() => setAmb(!checkAmbiguous)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${checkAmbiguous ? "bg-cyan-500" : "bg-zinc-700"
        }`}
      style={{ boxShadow: checkAmbiguous ? "0 0 12px rgba(34,211,238,0.4)" : "none" }}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${checkAmbiguous ? "left-6" : "left-1"
          }`}
      />
    </button>
  );
};

export default PassGen;