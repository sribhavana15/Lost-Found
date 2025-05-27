document.addEventListener("DOMContentLoaded", function () {
    M.updateTextFields(); // Update floating labels
  
    const forms = document.querySelectorAll("form.needs-validation");
  
    forms.forEach(form => {
      form.addEventListener("submit", function (e) {
        let isValid = true;
  
        const emailField = form.querySelector("input[type='email']");
        const passwordField = form.querySelector("input[type='password']");
        const requiredFields = form.querySelectorAll("input[required], textarea[required], select[required]");
  
        //  Check for empty required fields
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            const label = field.previousElementSibling?.textContent || field.name || "This field";
            M.toast({ html: ` ${label.trim()} is required`, classes: "red rounded" });
            isValid = false;
          }
        });
  
        //  Check email format
        if (emailField && !/^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|co|in|uk|ca|au|de)$/i.test(emailField.value)) {
          M.toast({ html: " Invalid email format", classes: "red rounded" });
          isValid = false;
        }
  
        //  Check password length
        if (passwordField && passwordField.value.length < 6) {
          M.toast({ html: " Password must be at least 6 characters", classes: "red rounded" });
          isValid = false;
        }
  
        if (!isValid) {
          e.preventDefault(); // Stop submission
        }
      });
    });
  });
  
