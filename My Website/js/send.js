$(document).ready(function() {
    $("head").append("\
        <link rel='stylesheet' href='fancybox/source/jquery.fancybox.css?v=2.1.5' type='text/css' media='screen' />\
        <link rel='stylesheet' href='fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7' type='text/css' media='screen' />\
        <link rel='stylesheet' href='css/style.css'/>");
    $("body").append("\
        <div id='results' class='fancybox-window'>\
            <h3>Your data is sent to the web host's database:</h3>\
            <table>\
                <thead>\
                    <tr>\
                        <th>First name</th>\
                        <th>Last name</th>\
                        <th>Email</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr>\
                        <td>Andrew</td>\
                        <td>Philips</td>\
                        <td>aphilips@gmail.com</td>\
                    </tr>\
                    <tr>\
                        <td>Rebecca</td>\
                        <td>Sharpe</td>\
                        <td>r.sharpe@mservice.net</td>\
                    </tr>\
                    <tr>\
                        <td>Christopher</td>\
                        <td>Moore</td>\
                        <td>c.x.m@gmail.co.uk</td>\
                    </tr>\
                    <tr>\
                        <td>Jane</td>\
                        <td>Robinson</td>\
                        <td>jane@gmail.com</td>\
                    </tr>\
                    <tr id='new-entry'>\
                        <td id='firstname_cell'></td>\
                        <td id='lastname_cell'></td>\
                        <td id='email_cell'></td>\
                    </tr>\
                </tbody>\
            </table>\
            <h4>Here, it is added to their table of user data. This data can then be used by the web owner to email you offers.</h4>\
        </div>");
    // Set default submit button text
    var buttonval = "Submit";
    // Try to get an existing submit button
    var buttonobj = $("#subscribe-form input[type='submit']");
    // If it exists, steal it's value and use it on the fake button
    if (buttonobj.val()) {
        buttonval = buttonobj.val();
    }
    // Hide the submit button and replace it with a fake one
    buttonobj.hide();
    $("#subscribe-form").append("<a href='#results' id='submit_replacement'>" + buttonval + "</a>");

    // Configure and display the popup window using Fancybox plugin
    $("#submit_replacement").click(function() {
        var firstname = $("input[name='firstname']").val();
        var lastname = $("input[name='lastname']").val();
        var email = $("input[name='email']").val();
        var valid = validate(firstname, lastname, email);
        if (valid) {
            $("#submit_replacement").addClass("fancybox");
            $(".fancybox").fancybox();
            // Set the new values in the table
            $("#firstname_cell").html(firstname);
            $("#lastname_cell").html(lastname);
            $("#email_cell").html(email);
        } else {
            // Prevent Fancybox from showing if data didn't validate
            $("#submit_replacement").removeClass("fancybox");
        }
    });
});


/* Custom function to validate an email address using a regular expression. should in real
   life be coupled with server side validation to truly confirm address. the regular
   expression used here just checks for the presence of an @ symbol. in a real life
   scenario a more powerful regex should be used. */

function check_email(email) {
    var reg = /.+@.+/;
    return reg.test(email);
}

function validate(firstname, lastname, email) {
	var validated = true; // validated by default

	var result = "";

	if( check_email(email) == false && email != "" ){
		result = result + "Email not valid.";
		validated = false;
	}

	if( firstname == "" || lastname == "" || email == "" ){
		result = result + "Please fill out all fields.";
		validated = false;
	}

	// if validated is still true...
	if( validated == true ){
	    return true;
    } else {
        // tell the user what went wrong
	    alert(result);
        return false;
    }
}
