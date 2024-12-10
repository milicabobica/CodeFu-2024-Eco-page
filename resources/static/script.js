let userLocation = null;

//  OpenStreetMap
const map = L.map('map').setView([41.9981, 21.4254], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                userLocation = { lat, lng };

                // marker na mapata
                map.setView([lat, lng], 16);
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup('Вашата локација е одредена.')
                    .openPopup();

                // prikazi gi koordinatite
                document.getElementById('locationDisplay').textContent = `Локација: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            },
            () => {
                alert('Не можеме да ја одредиме вашата локација. Проверете дали геолокацијата е дозволена.');
            }
        );
    } else {
        alert('Вашиот уред не поддржува геолокација.');
    }
});

// Isprati forma
document.getElementById('pollutionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const imageInput = document.getElementById('image');

    if (!userLocation) {
        alert('Прво одредете ја вашата локација!');
        return;
    }

    const formData = new FormData();
    formData.append('location', `${userLocation.lat},${userLocation.lng}`);
    formData.append('description', description);
    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        // isprati do server
        const response = await fetch('http://localhost:8080' +
            '', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);

            // marker na mapa
            L.marker([userLocation.lat, userLocation.lng])
                .addTo(map)
                .bindPopup(`<strong>Опис:</strong> ${description}`)
                .openPopup();

            // izveshtaj +vo lista
            const listItem = document.createElement('li');
            listItem.textContent = `Локација: ${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)} | Опис: ${description}`;
            document.getElementById('reportList').appendChild(listItem);

            // reset na forma
            document.getElementById('pollutionForm').reset();
            userLocation = null;
            document.getElementById('locationDisplay').textContent = 'Локација: Сѐ уште не е одредена';
        } else {
            alert('Грешка при поднесување на извештајот.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Грешка при комуникација со серверот.');
    }
});


const loadReports = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/reports');
        if (response.ok) {
            const reports = await response.json();
            reports.forEach((report) => {
                const [lat, lng] = report.location.split(',').map(Number);

                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`<strong>Опис:</strong> ${report.description}`)
                    .openPopup();

                //izvestaj vo lista
                const listItem = document.createElement('li');
                listItem.textContent = `Локација: ${lat.toFixed(6)}, ${lng.toFixed(6)} | Опис: ${report.description}`;
                document.getElementById('reportList').appendChild(listItem);
            });
        } else {
            console.error('Не успеавме да ги вчитаме извештаите.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

loadReports();