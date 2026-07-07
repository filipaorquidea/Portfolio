

async function startAudioReactiveText() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const source = audioCtx.createMediaStreamSource(stream);

		const analyser = audioCtx.createAnalyser();
		analyser.fftSize = 2048;
		source.connect(analyser);

		const data = new Uint8Array(analyser.fftSize);

		const textos = () => Array.from(document.getElementsByClassName('texto'));

		function getVolume() {
			analyser.getByteTimeDomainData(data);
			// compute RMS (root mean square) of waveform to estimate volume
			let sum = 0;
			for (let i = 0; i < data.length; i++) {
				const v = (data[i] - 128) / 128; // normalize to -1..1
				sum += v * v;
			}
			const rms = Math.sqrt(sum / data.length);
			return rms; // 0..~1
		}

		let lastUpdate = 0;

		function animate(now) {
			// throttle updates a bit (optional)
			if (now - lastUpdate >= 16) {
				const vol = getVolume();
				// Map volume to scale and color
				const scale = 1 + vol * 2.5; // adjust multiplier to taste
				const hue = Math.min(120, 120 * vol); // green when louder

				textos().forEach((el) => {
					el.style.transition = 'transform 0.08s linear, color 0.08s linear';
					el.style.transform = `scale(${scale})`;
					el.style.textShadow = `0 0 ${Math.max(2, vol * 30)}px rgba(0,0,0,0.4)`;
				});

				lastUpdate = now;
			}
			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	} catch (err) {
		console.warn('Microphone access denied or not available:', err);
	}
}

// Start automatically when page has loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', startAudioReactiveText);
} else {
	startAudioReactiveText();
}

const numDivs = 20;

  for (let i = 0; i < numDivs; i++) {
    createDraggableDiv();
  }

  function createDraggableDiv() {
    const draggable = document.createElement('div');
    draggable.classList.add('draggable');
    draggable.appendChild(document.createTextNode('FILIPA ORQUÍDEA'));
    
    const randomX = Math.random() * (window.innerWidth-200);
    const randomY = Math.random() * (window.innerHeight-200);

    draggable.style.left = `${randomX}px`;
    draggable.style.top = `${randomY}px`;

    let isDragging = false;
    let offsetX, offsetY;

    draggable.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - draggable.getBoundingClientRect().left;
      offsetY = e.clientY - draggable.getBoundingClientRect().top;
      draggable.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        draggable.style.left = `${x}px`;
        draggable.style.top = `${y}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      draggable.style.cursor = 'grab';
    });

    document.body.appendChild(draggable);
  }