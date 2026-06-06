const API_BASE_URL = 'http://localhost:8000/api';
const ADMIN_URL = 'http://localhost:4200';
document.addEventListener('DOMContentLoaded', () => {
    // Form submission handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const formData = {
                full_name: this.elements[0].value,
                // gymName: this.elements[1].value,
                email: this.elements[2].value,
                phone: this.elements[3].value,
                password: this.elements[4].value,
            };

            // Validate
            if (!this.elements[5].checked) {
                alert('Please accept the Terms of Service and Privacy Policy');
                return;
            }

            try {
                // Make API request with form data
                const response = await fetch(`${API_BASE_URL}/auth/signup-owner`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Success feedback
                console.log('Form successfully submitted to API:', data);
                alert('Account created successfully! 🚀');

                window.location.href = `${ADMIN_URL}/onboarding`;
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was a problem submitting your form. Please try again.');
            }
        });
    }

    // Sign In Link handler
    const signinLink = document.getElementById('signinLink');
    if (signinLink) {
        signinLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `${ADMIN_URL}/login`;
        });
    }

    // Phone number formatting
    // const phoneInput = document.querySelector('input[type="tel"]');
    // if (phoneInput) {
    //     phoneInput.addEventListener('input', function (e) {
    //         let value = e.target.value.replace(/\D/g, '');
    //         if (value.length > 0) {
    //             if (value.length <= 3) {
    //                 value = `+1 (${value}`;
    //             } else if (value.length <= 6) {
    //                 value = `+1 (${value.slice(0, 3)}) ${value.slice(3)}`;
    //             } else {
    //                 value = `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    //             }
    //         }
    //         e.target.value = value;
    //     });
    // }
});
