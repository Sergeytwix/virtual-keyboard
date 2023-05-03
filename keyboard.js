// Create tablearea for text
let textarea = document.createElement('textarea');
textarea.className = "textarea use-keyboard-input";
textarea.setAttribute("onblur", "this.focus()");
document.body.append(textarea);
document.querySelector('textarea').focus();


//Create keyboard
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    input: null
  },

  properties: {
    value: "",
    capsLock: false,
    language: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      this.inputKey(ddd => {
        element.value = ddd;
      });
    });


    // IF KEY DOWN
    document.addEventListener('keydown', function(event) {

      if (((event.shiftKey || event.ctrlKey) && event.altKey) || (event.shiftKey && event.ctrlKey) ) { // change language
        let keys = document.querySelector(".keyboard__keys");
          while (keys.firstChild) {
            keys.removeChild(keys.firstChild);
          }
        Keyboard.properties.language = !Keyboard.properties.language;
        Keyboard.elements.keysContainer.appendChild(Keyboard._createKeys());
        Keyboard.elements.keys = Keyboard.elements.keysContainer.querySelectorAll(".keyboard__key");
      } else if ((event.code === "CapsLock") ) { // caps lock
        element = document.getElementById('caps');
        element.classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
        Keyboard._toggleCapsLock();
      } else {
        element.classList.add("keyboard__key--actived");
      }
    });
    
    // IF KEY UP
    document.addEventListener('keyup', function(event) {
      element = document.getElementById(event.key.toLowerCase());
      if(event.code != "CapsLock") {
        element.classList.remove("keyboard__key--actived");
      }
    });
    
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    // Eng layout
    const keyLayoutEN = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
      "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "DEL",
      "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER",
      "ShiftL", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Up", "ShiftR",
      "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "Left", "Down", "Right"
    ];

    // Rus layout
    const keyLayoutRU = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
      "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "DEL",
      "Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ENTER",
      "ShiftL", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Up", "ShiftR",
      "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "Left", "Down", "Right"
    ];


    // Language selection
    !this.properties.language ? keyLayout = keyLayoutEN : keyLayout = keyLayoutRU;

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["Backspace", "DEL", "ENTER", "ShiftR"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.setAttribute("id", key.toLowerCase());
      keyElement.classList.add("keyboard__key");

      // Defining functions for keys
      switch (key) {

        case "Backspace":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("input");
          });

          break;

        case "`":
          keyElement.textContent = key;
          keyElement.classList.add("keyboard__key--dark");
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("input");
          });
          break;
          
        case "Tab":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this.properties.value += "\t";
            this._triggerEvent("input");
          });

          break;

        case "ShiftL":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "ShiftL"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--actived");
            keyElement.classList.toggle("keyboard__key--dark");
            this._triggerEvent("input");
          });
          break;

        case "ShiftR":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "ShiftR"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "DEL":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "DEL"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Ctrl":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Ctrl"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Win":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Win"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Alt":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Alt"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Left":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Left"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Right":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Right"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Up":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Up"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Down":
          keyElement.classList.add("keyboard__key--dark");
          // function for key "Down"
          keyElement.textContent = key;
          keyElement.addEventListener("click", () => {
            this._triggerEvent("input");
          });
          break;

        case "Caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--dark");
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "ENTER":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("input");
          });

          break;

        case "Space":
          keyElement.classList.add("keyboard__key--space", "keyboard__key--dark");
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("input");
          });

          break;

        default:
          keyElement.textContent = key;

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("input");
          });

          break;
      }

      fragment.appendChild(keyElement);

      // Line break for keyboard
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  // Changing the state of the Caps Lock key
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.className === "keyboard__key") {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  inputKey(input) {
    this.eventHandlers.input = input;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

console.log("Клавиатура создана в операционной системе Windows.");
console.log("Для переключения языка комбинация: ctrl + alt / shift + alt / shift + ctrl.")