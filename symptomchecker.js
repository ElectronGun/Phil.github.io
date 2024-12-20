
// Jquery - check HTML loaded before JS code
// Jquery - show/hide based on age and cough type + client-side web form validation
// Client-side web form validation age, cough type, additional (show if >= 12 w/ productive)
$(document).ready(function() {
    $('input[name="coughType"]').on('change', function() {
        var age = $('#age').val();
        if ($(this).val() === 'productive' && age >= 12) {
            $('#additionalSymptoms').show();
        } else {
            $('#additionalSymptoms').hide();
        }
    });

    // Manipulate the DOM (Document Object Model) - show or hide elements - additionalsymptoms div based on age and cough type
    $('#age').on('change', function() {
        var coughType = $('input[name="coughType"]:checked').val();
        if ($(this).val() >= 12 && coughType === 'productive') {
            $('#additionalSymptoms').show();
        } else {
            $('#additionalSymptoms').hide();
        }
    });
        
    // Jquery - method that attaches an event handler function to the 'submit' event of the form with the id 'symptomForm'
    // Prevent default - stop from sending without all questions answered
    $('#symptomForm').on('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        // Display alert, stop function
        if (!this.checkValidity()) {
            $('#result').html('<div class="alert alert-danger">Please answer all form questions.</div>');
            return;
        }

    // Get form values
    // Jquery - Methods that get the values of form inputs
    // Manipulate the DOM - get form values - :checked, .val upon submission
        var age = $('#age').val();
        var coughType = $('input[name="coughType"]:checked').val();
        var problemState = $('#problemState').val();
        var fever = $('#fever').is(':checked');
        var vomiting = $('#vomiting').is(':checked');
        var diarrhea = $('#diarrhea').is(':checked');

    // Determine possible cause based on form values
        var possibleCause;
        if (age < 12 && coughType === 'dry' && problemState === 'new') {
            possibleCause = 'Possibility: Emergent infections, allergies, and irritant exposure';
        } else if (age >= 12 && coughType === 'dry' && problemState === 'new') {
            possibleCause = 'Possibility: Emergent infections, allergies, and irritant exposure';
        } else if (age >= 12 && coughType === 'dry' && problemState === 'ongoing') {
            possibleCause = 'Possibility: Chronic bronchitis or other chronic respiratory conditions';
        } else if (age >= 12 && coughType === 'dry' && problemState === 'worsening') {
            possibleCause = 'Urgent: Possible severe respiratory infection, consult a healthcare professional immediately';
        } else if (age >= 12 && coughType === 'productive' && problemState === 'worsening' && fever && vomiting && diarrhea) {
            possibleCause = 'Urgent: Total Body System Meltdown - Consider Hospitalization';
        } else if (age >= 12 && coughType === 'productive' && problemState === 'new' && fever && vomiting && diarrhea) {
            possibleCause = 'Alert: Fasten your seatbelt! Drink water now!';    
        } else if (age >= 12 && coughType === 'productive' && problemState === 'ongoing' && fever && vomiting && !diarrhea) {
            possibleCause = 'Possibility: Pneumonia or bronchitis';
        } else if (age >= 12 && coughType === 'productive' && problemState === 'ongoing' && fever && !vomiting && diarrhea) {
            possibleCause = 'Possibility: Gastrointestinal infection';
        } else if (age >= 12 && coughType === 'productive' && problemState === 'ongoing' && !fever && vomiting && diarrhea) {
            possibleCause = 'Possibility: Food poisoning';
        } else if (age >= 12 && coughType === 'productive' && problemState === 'new' && !fever && !vomiting && !diarrhea) {
            possibleCause = 'Possibility: Emergent respiratory infection';
        } else {
            possibleCause = 'Please consult a healthcare professional.';
        }

    // Display possible cause
    // Jquery - Method that sets the HTML content of the element with the id 'result' - Selector target 'result'
    // Bootstrap alert classes, margin, width
    $('#result').html('<div class="alert alert-success custom-border mt-2 w-50">' + possibleCause + '</div>');
    });
        
    // Reset the Form - Clear
    // Hide additionalsymptoms upon reset
    // Jquery - Method that attaches an event handler function to the 'reset' event of the form with the id 'symptomForm'
    // Manipulate the DOM - .on() method to attach event handlers to submit, reset, change, events, cough type and age inputs
    $('#symptomForm').on('reset', function() {
        $('#result').empty();
        $('#additionalSymptoms').hide();
    });
});
   