document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('Veuillez remplir tous les champs');
    } else {
        alert(`Merci ${name}, votre message a été envoyé !`);
        document.getElementById('contactForm').reset(); // Réinitialise le formulaire
    }
});
