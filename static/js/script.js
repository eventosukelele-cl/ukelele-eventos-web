/* ====================================== */
/* MENÚ MÓVIL                             */
/* ====================================== */

/* Obtiene el botón hamburguesa */
const menuToggle = document.getElementById("menuToggle");

/* Obtiene el contenedor del menú */
const mainNav = document.getElementById("mainNav");

/* Si existen ambos elementos */
if (menuToggle && mainNav) {
  /* Al hacer clic en el botón */
  menuToggle.addEventListener("click", () => {
    /* Alterna la clase active del menú */
    mainNav.classList.toggle("active");
  });
}

/* Selecciona todos los links del menú */
const navLinks = document.querySelectorAll(".nav a");

/* Recorre cada link */
navLinks.forEach((link) => {
  /* Al hacer clic en un link */
  link.addEventListener("click", () => {
    /* Si existe el menú */
    if (mainNav) {
      /* Lo cierra */
      mainNav.classList.remove("active");
    }
  });
});

/* ====================================== */
/* REVEAL AL HACER SCROLL                 */
/* ====================================== */

/* Selecciona todos los elementos con clase reveal */
const revealElements = document.querySelectorAll(".reveal");

/* Crea un observer para detectar cuándo entran en pantalla */
const revealObserver = new IntersectionObserver(
  (entries) => {
    /* Recorre todos los elementos observados */
    entries.forEach((entry) => {
      /* Si el elemento está visible */
      if (entry.isIntersecting) {
        /* Agrega la clase que activa la animación */
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    /* Umbral de visibilidad */
    threshold: 0.15,
  }
);

/* Observa cada elemento reveal */
revealElements.forEach((element) => {
  /* Lo agrega al observer */
  revealObserver.observe(element);
});

/* ====================================== */
/* FAQ ACORDEÓN                           */
/* ====================================== */

/* Selecciona todos los bloques FAQ */
const faqItems = document.querySelectorAll(".faq-item");

/* Recorre cada item */
faqItems.forEach((item) => {
  /* Busca el botón de la pregunta */
  const question = item.querySelector(".faq-question");

  /* Si existe */
  if (question) {
    /* Al hacer clic */
    question.addEventListener("click", () => {
      /* Alterna la clase active en el item */
      item.classList.toggle("active");
    });
  }
});

/* ====================================== */
/* LIGHTBOX                               */
/* ====================================== */

/* Obtiene el contenedor del lightbox */
const lightbox = document.getElementById("lightbox");

/* Obtiene la imagen del lightbox */
const lightboxImage = document.getElementById("lightboxImage");

/* Obtiene el botón de cierre */
const lightboxClose = document.getElementById("lightboxClose");

/* Selecciona todos los botones que abrirían zoom */
const zoomButtons = document.querySelectorAll(".gallery-item__zoom");

/* Recorre cada botón */
zoomButtons.forEach((button) => {
  /* Al hacer clic */
  button.addEventListener("click", (event) => {
    /* Busca el elemento padre más cercano .gallery-item */
    const galleryItem = event.target.closest(".gallery-item");

    /* Si no existe, se detiene */
    if (!galleryItem) return;

    /* Busca la imagen dentro del item */
    const image = galleryItem.querySelector("img");

    /* Si no existe imagen, se detiene */
    if (!image) return;

    /* Copia el src al lightbox */
    lightboxImage.src = image.src;

    /* Copia el alt al lightbox */
    lightboxImage.alt = image.alt;

    /* Abre el lightbox */
    lightbox.classList.add("active");
  });
});

/* Si existe el botón cerrar */
if (lightboxClose) {
  /* Cierra al hacer clic */
  lightboxClose.addEventListener("click", () => {
    /* Quita la clase active */
    lightbox.classList.remove("active");
  });
}

/* Si existe el contenedor del lightbox */
if (lightbox) {
  /* Permite cerrar al hacer clic fuera de la imagen */
  lightbox.addEventListener("click", (event) => {
    /* Si el clic fue sobre el fondo */
    if (event.target === lightbox) {
      /* Cierra el lightbox */
      lightbox.classList.remove("active");
    }
  });
}

/* Permite cerrar con tecla Escape */
window.addEventListener("keydown", (event) => {
  /* Si la tecla es Escape y existe lightbox */
  if (event.key === "Escape" && lightbox) {
    /* Cierra el lightbox */
    lightbox.classList.remove("active");
  }
});

/* ====================================== */
/* UTILIDADES DE TRACKING                 */
/* ====================================== */

/* Función que obtiene los parámetros UTM de la URL */
function getUTMParams() {
  /* Crea un objeto para leer la query string */
  const params = new URLSearchParams(window.location.search);

  /* Devuelve un objeto con todos los UTMs */
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

/* ====================================== */
/* FORMULARIO DE DESCUENTO                */
/* ====================================== */

/* Obtiene el formulario */
const discountForm = document.getElementById("discountForm");

/* Obtiene el texto de feedback */
const formMessage = document.getElementById("formMessage");

/* Obtiene el botón submit */
const discountSubmit = document.getElementById("discountSubmit");

/* Obtiene la caja de éxito */
const discountSuccess = document.getElementById("discountSuccess");

/* Obtiene el texto del código */
const discountCodeText = document.getElementById("discountCodeText");

/* Obtiene el botón de WhatsApp */
const discountWhatsappBtn = document.getElementById("discountWhatsappBtn");

/* Define el código fijo del descuento */
const FIXED_DISCOUNT_CODE = "UKEWEB-10";

/* Si el formulario existe */
if (discountForm) {
  /* Escucha el envío */
  discountForm.addEventListener("submit", async (event) => {
    /* Evita recargar la página */
    event.preventDefault();

    /* Obtiene el valor del nombre */
    const name = document.getElementById("discountName").value.trim();

    /* Obtiene el valor del teléfono (NUEVO) */
    const phone = document.getElementById("discountPhone").value.trim();

    /* Obtiene el valor del email */
    const email = document.getElementById("discountEmail").value.trim();

    /* Obtiene el estado del consentimiento */
    const consent = document.getElementById("discountConsent").checked;

    /* Obtiene el valor del honeypot */
    const website = document.getElementById("website").value.trim();

    /* Patrón simple de validación de email */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /* Limpia mensajes anteriores */
    formMessage.textContent = "";

    /* Si existe el bloque de éxito */
    if (discountSuccess) {
      /* Lo oculta al iniciar */
      discountSuccess.hidden = true;
    }

    /* Si el honeypot trae valor, probablemente es spam */
    if (website !== "") {
      /* Muestra error genérico */
      formMessage.textContent = "No fue posible procesar el envío.";

      /* Color rojo */
      formMessage.style.color = "#b91c1c";

      /* Sale */
      return;
    }

    /* Si falta nombre */
    if (!name) {
      /* Muestra error */
      formMessage.textContent = "Por favor, ingresa tu nombre.";

      /* Color rojo */
      formMessage.style.color = "#b91c1c";

      /* Sale */
      return;
    }

    /* Si falta el teléfono */
    if (!phone) {
      formMessage.textContent = "Por favor, ingresa tu número de teléfono.";
      formMessage.style.color = "#b91c1c";
      return;
    }

    /* Si el email no es válido */
    if (!emailPattern.test(email)) {
      /* Muestra error */
      formMessage.textContent = "Por favor, ingresa un correo válido.";

      /* Color rojo */
      formMessage.style.color = "#b91c1c";

      /* Sale */
      return;
    }

    /* Si no aceptó el consentimiento */
    if (!consent) {
      /* Muestra error */
      formMessage.textContent = "Debes aceptar el envío de información para recibir tu descuento.";

      /* Color rojo */
      formMessage.style.color = "#b91c1c";

      /* Sale */
      return;
    }


    /* Desactiva el botón para evitar doble envío */
    discountSubmit.disabled = true;

    /* Cambia el texto del botón */
    discountSubmit.textContent = "Enviando...";

    /* Obtiene UTMs de la URL */
    const utm = getUTMParams();

    /* Arma el objeto que se enviará al backend */
    const payload = {
      name: name,
      phone: phone,
      email: email,
      consent: consent ? "yes" : "no",
      discount: "10%",
      discountCode: FIXED_DISCOUNT_CODE,
      source: "website-ukelele",
      page: window.location.href,
      referrer: document.referrer || "",
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ...utm,
    };

try {
      /* 1. TU URL DEFINITIVA DEL CRM */
      const URL_DEFINITIVA = "https://script.google.com/macros/s/AKfycbyL9mO-LnPxqvXa6sm_9TCmi15vGMch8pzQ7xKZuXNF6-5jTG443WY0NDK5Hrsn4OUf/exec";

      /* 2. ENVIAMOS LOS DATOS CON "NO-CORS" (Deja la carta y no espera recibo) */
      await fetch(URL_DEFINITIVA, {
        method: "POST",
        mode: "no-cors", /* <-- ESTA ES LA MAGIA QUE EVITA EL ERROR FALSO */
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      /* 3. COMO SABEMOS QUE EL ENVÍO FUNCIONA, MOSTRAMOS EL ÉXITO DIRECTAMENTE */
      
      /* Guarda respaldo local del lead */
      localStorage.setItem("ukeleleLead", JSON.stringify(payload));
      
      /* Ejecuta la función que oculta el formulario y muestra la caja con el código */
      verificarDescuentoGuardado();

      /* Reinicia el formulario */
      discountForm.reset();

    } catch (error) {
      /* Mensaje de error (Solo se mostrará si se cae el internet) */
      formMessage.textContent = "Hubo un problema de conexión. Revisa tu internet.";
      formMessage.style.color = "#b91c1c";
    } finally {
      /* Reactiva el botón */
      discountSubmit.disabled = false;
      /* Restaura el texto del botón */
      discountSubmit.textContent = "Quiero mi 10% de descuento";
    }
  });
}

/* ====================================== */
/* ESTADO DEL FORMULARIO DE DESCUENTO     */
/* ====================================== */
function verificarDescuentoGuardado() {
  // 1. Buscamos si existe el registro previo en la memoria del navegador
  const leadGuardado = localStorage.getItem("ukeleleLead");

  // Si existe el registro, ejecutamos la lógica
  if (leadGuardado) {
    // 2. Seleccionamos los elementos que queremos ocultar (inputs y botón)
    const formGroups = document.querySelectorAll(".form-group");
    const checkboxGroup = document.querySelector(".checkbox");
    const submitBtn = document.getElementById("discountSubmit");
    const formMessage = document.getElementById("formMessage");

    // 3. Seleccionamos los elementos que queremos mostrar
    const discountSuccess = document.getElementById("discountSuccess");
    const discountWhatsappBtn = document.getElementById("discountWhatsappBtn");
    const FIXED_DISCOUNT_CODE = "UKEWEB-10";

    // 4. Ocultamos los campos para que la caja quede limpia
    formGroups.forEach(group => group.style.display = "none");
    if (checkboxGroup) checkboxGroup.style.display = "none";
    if (submitBtn) submitBtn.style.display = "none";
    if (formMessage) formMessage.style.display = "none";

    // 5. Mostramos la caja de éxito directamente
    if (discountSuccess) {
      discountSuccess.hidden = false;

      // Actualizamos el enlace de WhatsApp para que tenga sentido si vuelve a entrar
      if (discountWhatsappBtn) {
        const whatsappMessage = `Hola 😊 Ya tengo mi código de descuento de la web (${FIXED_DISCOUNT_CODE}) y quiero cotizar mi evento.`;
        discountWhatsappBtn.href = `https://wa.me/56948904545?text=${encodeURIComponent(whatsappMessage)}`;
      }
    }
  }
}

// 6. Le decimos al navegador que ejecute esta revisión apenas termine de cargar la página
document.addEventListener("DOMContentLoaded", verificarDescuentoGuardado);