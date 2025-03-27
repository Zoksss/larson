const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Funkcija koja menja href linkove u HTML fajlu
function updateLinks(filePath) {
    // Pročitaj HTML sadržaj fajla
    const html = fs.readFileSync(filePath, 'utf8');

    // Inicijalizuj cheerio za manipulaciju HTML-om
    const $ = cheerio.load(html);

    // Pronađi sve <a> tagove i promeni href atribute
    $('a').each((i, element) => {
        const href = $(element).attr('href');
        if (href && href.startsWith('/')) {
            $(element).attr('href', `/larson${href}`);
        }
    });

    // Sačuvaj izmenjeni HTML u originalni fajl
    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log(`Updated: ${filePath}`);
}

// Funkcija koja prelazi kroz sve HTML fajlove u direktorijumu
function updateHtmlFilesInDirectory(directoryPath) {
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        // Ako je fajl direktorijum, rekurzivno pozovi funkciju
        if (stat.isDirectory()) {
            updateHtmlFilesInDirectory(filePath);
        } else if (filePath.endsWith('.html')) {
            // Ako je fajl HTML, ažuriraj linkove
            updateLinks(filePath);
        }
    });
}

// Putanja do direktorijuma u kojem se nalaze HTML fajlovi

// Pozovi funkciju za ažuriranje svih HTML fajlova u direktorijumu
updateHtmlFilesInDirectory(__dirname);