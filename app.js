document.addEventListener("DOMContentLoaded", function () {

    //  start greeting animation
    startGreetingAnimation()

    // Get all section elements
    const sections = document.querySelectorAll("section");

    // Add smooth scroll behavior to navbar links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    let prevTarget = null; 
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // prevent trash when double clicking 
        if (target === prevTarget) {
          return; // Stop execution if the same target is clicked twice consecutively
        }
        prevTarget = target;
        if (target.id === "general-info") {
          document.getElementById("typing-animation").innerHTML = "";
          startAnimation();
        } 
        // Show the target section immediately
        sections.forEach((section) => {
          section.classList.remove("show");
        });
        target.classList.add("show");

      });
    });

    // Remove the picture
    var navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
    var image = document.querySelector(".image");

    navbarLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        image.classList.add("fade-out");
      });
    });
    var home_logo = document.querySelectorAll(".logo");
    home_logo.forEach(function(link) {
        link.addEventListener("click", function() {
            
        // Show the target section immediately
        sections.forEach((section) => {
            section.classList.remove("show");
          });
          image.classList.remove("fade-out");
          prevTarget = link;
        });
      });


    // Add event listener to handle scrollspy functionality
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          currentScroll >= sectionTop - sectionHeight * 0.5 &&
          currentScroll < sectionTop + sectionHeight
        ) {
          section.classList.add("show");
        } else {
          section.classList.remove("show");
        }
      });
    });

    // Show initial active section
    const initialSection = document.querySelector(
      ".navbar-nav .nav-link.active"
    );
    const initialTarget = document.querySelector(
      initialSection.getAttribute("href")
    );
    initialTarget.classList.add("show");




    
  });
    // typing animation

function startAnimation() {
    const text = "console.log('Hello World!')";
    const typingElement = document.getElementById("typing-animation");
  
    let charIndex = 0;
  
    function typeNextChar() {
      typingElement.textContent += text.charAt(charIndex);
      charIndex++;
  
      if (charIndex === text.length) {
        typingElement.style.borderRight = "none";
        clearInterval(typingInterval);
      }
    }
  
    const typingInterval = setInterval(typeNextChar, 50);
  };

function startGreetingAnimation() {
    const text = "Pleased to see you here on this page. Please take a look around! If you have any questions, just hit me up! (Check the Contacts Tab😉)";
    const typingElement = document.getElementById("greeting-animation");
  
    let charIndex = 0;
  
    function typeNextChar() {
      typingElement.textContent += text.charAt(charIndex);
      charIndex++;
  
      if (charIndex === text.length) {
        typingElement.style.borderRight = "none";
        clearInterval(typingInterval);
      }
    }
  
    const typingInterval = setInterval(typeNextChar, 50);
  };

  $(document).ready(function() {
    // cats
    var facts;
    $.ajax({
      url: "https://cat-fact.herokuapp.com/facts",
      method: "GET",
      success: function(response) {
        // Extract "text" from each item and set the innerHTML of the <p> element
          facts = response.map(function(item) {
          return item.text;
        });

      },
      error: function(xhr, status, error) {
        console.error("Ajax request error:", error);
      }
    });
    i=0
    // Button click event handler
    $("#fetchCatButton").click(function() {
      if (i < facts.length) {
        $("#cat-field").html(facts[i]);
        i++
      } else {
        i=0
      }

    });

  // clear after submitting form 
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form data
    const name = document.getElementById('contact-form-name').value;
    const email = document.getElementById('contact-form-email').value;
    const message = document.getElementById('contact-form-message').value;
  
    // Create form data object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
  
    // Send AJAX request
    fetch(form.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Handle success response
        console.log(data);
        // Clear input fields
        clearInputFields();
        $('.toast').toast({
          delay: 5000
        });
        $('.toast').toast('show');
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  });

  function clearInputFields() {
    const inputs = document.querySelectorAll('input');
    const textarea=document.getElementById('contact-form-message')
    textarea.value="";
    inputs.forEach(input => {
      input.value = ''; 
    });
  }

  });
    // Dictionary

    function getDefinition() {
      var word = document.getElementById("dictionary-field").value;
      // Make Ajax request
      $.ajax({
        url: "https://api.dictionaryapi.dev/api/v2/entries/en/" + word,
        method: "GET",
        success: function(response) {
          // Extract word, phonetics, and definitions
          var wordData = response[0];
          var wordHTML = "<h2>" + wordData.word + "</h2>";

          // Add audio for each phonetic
          var phonetics = wordData.phonetics;
          phonetics.forEach(function(phonetic) {
            if (phonetic.audio) {
              var audioHTML = "<audio controls><source src='" + phonetic.audio + "' type='audio/mpeg'></audio>";
              wordHTML += "<div>" + phonetic.text + " " + audioHTML + "</div>";
            } else {
              wordHTML += "<div>" + phonetic.text + "</div>";
            }
          });

          // Add definitions with examples
          var meanings = wordData.meanings;
          meanings.forEach(function(meaning) {
            wordHTML += "<h3>" + meaning.partOfSpeech + "</h3>";
            var definitions = meaning.definitions;
            definitions.forEach(function(definition) {
              wordHTML += "<p><strong>Definition:</strong> " + definition.definition + "</p>";
              if (definition.example) {
                wordHTML += "<p><strong>Example:</strong> " + definition.example + "</p>";
              }
            });
          });

          // Set the word details HTML
          $("#wordDetails").html(wordHTML);
        },
        error: function(xhr, status, error) {
          console.error("Ajax request error:", error);
        }
      });
    }
