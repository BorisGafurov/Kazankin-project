// Web Audio API Desert Wind Sound Synthesizer
let audioCtx: AudioContext | null = null;

export function playDesertWindSound(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const sampleRate = audioCtx.sampleRate;
    const duration = 0.75;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Natural pink/brown noise envelope
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.1614000;
      b2 = 0.87000 * b2 + white * 0.2227000;
      const pink = b0 + b1 + b2 + white * 0.5362;
      const progress = i / bufferSize;
      const env = Math.sin(progress * Math.PI);
      data[i] = pink * 0.12 * env;
    }

    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.value = 2.4;
    bandpass.frequency.setValueAtTime(850, audioCtx.currentTime);
    bandpass.frequency.exponentialRampToValueAtTime(240, audioCtx.currentTime + 0.7);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.72);

    noiseSource.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(audioCtx.destination);

    noiseSource.start();
  } catch (_) {}
}
