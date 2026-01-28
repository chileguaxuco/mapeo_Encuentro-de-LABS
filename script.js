var map = L.map('map').setView([-10, -60], 3); 
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

let labs = [];

fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            header: true,
            complete: function(results) {
                results.data.forEach((row, index) => {
                    if (row.Latitud && row.Longitud) {
                        const lat = parseFloat(row.Latitud);
                        const lng = parseFloat(row.Longitud);
                        const nombre = row['Nombre del laboratorio'] || 'Sin nombre';
                        const ciudad = row.Ciudad || '';
                        const pais = row.Pais || '';
                        const descripcion = row['Descripción del laboratorio'] || 'Sin descripción';
                        const fechaComienzo = row['Fecha de comienzo del Laboratorio'] || '';
                        const paginaWeb = row['Página web'] || '';
                        const instagram = row.Instagram || '';
                        const facebook = row.Facebook || '';
                        const twitter = row.Twitter || '';
                        const spotify = row.Spotify || '';
                        const linkedin = row.Linkedin || '';
                        const tiktok = row['Tik Tok'] || '';
                        const twitch = row.Twitch || '';
                        const youtube = row.Youtube || '';
                        const representante = row['Persona que viaja a Monterrey'] || '';
                        const cargoRepresentante = row['Cargo del representante'] || '';
                        const semblanza = row['Semblanza del representante'] || '';
                        const imagen = row.Imagen || '';
                        const flickr = row.Flickr || '';

                        labs.push({
                            nombre, ciudad, pais, descripcion, fechaComienzo,
                            paginaWeb, instagram, facebook, twitter, spotify, linkedin, tiktok, twitch, youtube,
                            representante, cargoRepresentante, semblanza, imagen, flickr
                        });

                        let popupContent = '';
                        if (imagen) {
                            popupContent += `<img src="${imagen}" alt="${nombre}" style="width:100px; height:auto;"><br>`;
                        }
                        popupContent += `<h3 style="cursor:pointer; color:blue;" onclick="showLabInfo(${labs.length - 1})">${nombre}</h3>`;

                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(popupContent);
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error cargando el CSV:', error));

function showLabInfo(index) {
    const lab = labs[index];
    const labInfoDiv = document.getElementById('lab-info');
    labInfoDiv.innerHTML = `
        <h2>${lab.nombre}</h2>
        ${lab.imagen ? `<img src="${lab.imagen}" alt="${lab.nombre}" style="max-width:300px; height:auto;"><br>` : ''}
        ${lab.ciudad ? `<p><strong>Ciudad:</strong> ${lab.ciudad}</p>` : ''}
        ${lab.pais ? `<p><strong>País:</strong> ${lab.pais}</p>` : ''}
        ${lab.descripcion ? `<p><strong>Descripción:</strong> ${lab.descripcion}</p>` : ''}
        ${lab.fechaComienzo ? `<p><strong>Fecha de comienzo:</strong> ${lab.fechaComienzo}</p>` : ''}
        ${lab.paginaWeb ? `<p><strong>Sitio web:</strong> <a href="${lab.paginaWeb}" target="_blank">${lab.paginaWeb}</a></p>` : ''}
        ${lab.instagram ? `<p><strong>Instagram:</strong> <a href="${lab.instagram}" target="_blank">${lab.instagram}</a></p>` : ''}
        ${lab.facebook ? `<p><strong>Facebook:</strong> <a href="${lab.facebook}" target="_blank">${lab.facebook}</a></p>` : ''}
        ${lab.twitter ? `<p><strong>Twitter:</strong> <a href="${lab.twitter}" target="_blank">${lab.twitter}</a></p>` : ''}
        ${lab.spotify ? `<p><strong>Spotify:</strong> <a href="${lab.spotify}" target="_blank">${lab.spotify}</a></p>` : ''}
        ${lab.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${lab.linkedin}" target="_blank">${lab.linkedin}</a></p>` : ''}
        ${lab.tiktok ? `<p><strong>TikTok:</strong> <a href="${lab.tiktok}" target="_blank">${lab.tiktok}</a></p>` : ''}
        ${lab.twitch ? `<p><strong>Twitch:</strong> <a href="${lab.twitch}" target="_blank">${lab.twitch}</a></p>` : ''}
        ${lab.youtube ? `<p><strong>YouTube:</strong> <a href="${lab.youtube}" target="_blank">${lab.youtube}</a></p>` : ''}
        ${lab.representante ? `<p><strong>Representante:</strong> ${lab.representante}</p>` : ''}
        ${lab.cargoRepresentante ? `<p><strong>Cargo del representante:</strong> ${lab.cargoRepresentante}</p>` : ''}
        ${lab.semblanza ? `<p><strong>Semblanza:</strong> ${lab.semblanza}</p>` : ''}
        ${lab.flickr ? `<p><strong>Flickr:</strong> <a href="${lab.flickr}" target="_blank">${lab.flickr}</a></p>` : ''}
    `;
    labInfoDiv.style.display = 'block';
}
