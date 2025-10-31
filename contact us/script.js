
        // FAQ Accordion
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    this.classList.add('active');
                }
            });
        });

        // Contact Card Click Effects
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('click', function() {
                const cardTitle = this.querySelector('h3').textContent;
                console.log(`Contact method clicked: ${cardTitle}`);
                
                // Add a visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            console.log('Form submitted:', formData);
            
            // Show success modal
            document.getElementById('successModal').classList.add('show');
            
            // Reset form
            this.reset();
        });

        function closeModal() {
            document.getElementById('successModal').classList.remove('show');
        }

        // Close modal when clicking outside
        document.getElementById('successModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
