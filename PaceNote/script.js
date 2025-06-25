function openLogGui() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOverlay(event) {
    if (event && event.target !== event.currentTarget) return;    
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function logRun() {
    const name = document.getElementById('name').value;;
    const distance = document.getElementById('distance').value;
    const time = document.getElementById('time').value;

    const runData = {
        id: Date.now(),
        name: name,
        distance: distance,
        time: time,
        date: new Date().toDateString()
    };

    let runs = JSON.parse(localStorage.getItem('runs')) || [];
    runs.push(runData)
    localStorage.setItem('runs', JSON.stringify(runs));

    document.getElementById('settingsForm').reset();
    closeOverlay()
    loadRuns()
}

function loadRuns() {
    const runs = JSON.parse(localStorage.getItem('runs')) || [];
    const runsGrid = document.querySelector('.runs-grid');

    runsGrid.innerHTML = '';

    if (runs.length === 0) {
        runsGrid.innerHTML = `
            <div class="runs-card">
                <p class="placeholder-text">Your runs will apear here</p>
            </div>
        `;
    } else {
        runs.forEach(run => {
            const runCard = document.createElement('div');
            runCard.className = 'run-card'
            runCard.style.position = 'relative'
            runCard.innerHTML = `
                    <button class="delete-btn" onclick="deleteRun(${run.id})" title="Delete run">×</button>
                    <h3 style="color: #ffffff; margin-bottom: 1rem; font-size: 1.3rem;">${run.name}</h3>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Distance:</span>
                        <span style="color: #ffffff; font-weight: 600;">${run.distance}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Time:</span>
                        <span style="color: #ffffff; font-weight: 600;">${run.time}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: rgba(255, 255, 255, 0.7);">Date:</span>
                        <span style="color: #ffffff; font-weight: 600;">${run.date}</span>
                    </div>
                `
            runsGrid.appendChild(runCard);
        });
    }
}

function deleteRun(runId) {
    const runs = JSON.parse(localStorage.getItem('runs')) || [];
    const updatedRuns = runs.filter(run => run.id !== runId);
    localStorage.setItem('runs', JSON.stringify(updatedRuns));

    const runCards = document.querySelectorAll('.run-card');
    runCards.forEach(card => {
        const deleteBtn = card.querySelector('.delete-btn');
        if (deleteBtn && deleteBtn.getAttribute('onclick') === `deleteRun(${runId})`) {
            card.classList.add('fade-out');
            card.addEventListener('animationend', () => {
                card.remove();
                if (updatedRuns.length === 0) loadRuns();
            });
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOverlay()
    }
});

document.addEventListener('DOMContentLoaded', function() {
    loadRuns();
});