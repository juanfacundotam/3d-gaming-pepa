            // --- Joystick ---
      let joystickInput = { forward: 0, strafe: 0 };

      function updateAvion(forward, strafe) {
        joystickInput.forward = forward;
        joystickInput.strafe = strafe;
      }
      // --- Joystick visual ---
      const circle = document.getElementById("joystick");
      const thumb = document.getElementById("thumb");
      const maxRadius = 40;
      let dragging = false;
      let origin = { x: 40, y: 40 };
      let delta = { x: 0, y: 0 };

      function getPos(e) {
        const t = e.touches ? e.touches[0] : e;
        return { x: t.clientX, y: t.clientY };
      }

      function moveThumb(x, y) {
        const dx = x - origin.x;
        const dy = y - origin.y;
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius);
        const angle = Math.atan2(dy, dx);
        delta.x = Math.cos(angle) * distance;
        delta.y = Math.sin(angle) * distance;

        thumb.style.left = `${20 + delta.x}px`;
        thumb.style.top = `${20 + delta.y}px`;

        const normalizedX = delta.x / maxRadius;
        const normalizedY = delta.y / maxRadius;
        // const normalizedY = 0;

        updateAvion(-normalizedY, normalizedX);

        // Detección de dirección
        // if (normalizedX < -0.2) {
        if (normalizedX < -0.2) {
          // console.log("Avion IZQUIERDA");
        } else if (normalizedX > 0.2) {
          //   console.log("Avion DERECHA");
        }

        if (normalizedY < 0) {
          //   console.log("Avion ADELANTE");
        } else if (normalizedY > 0.2) {
          //   console.log("Avion ATRÁS");
        }

        if (Math.abs(normalizedX) < 0.2 && Math.abs(normalizedY) < 0.2) {
          //   console.log("Avion en el CENTRO");
        }
      }

      function resetThumb() {
        delta = { x: 0, y: 0 };
        thumb.style.left = "20px";
        thumb.style.top = "20px";
        updateAvion(0, 0);
      }

      circle.addEventListener(
        "touchstart",
        (e) => {
          dragging = true;
          origin = getPos(e);
          e.preventDefault();
        },
        { passive: false }
      );

      window.addEventListener(
        "touchmove",
        (e) => {
          if (!dragging) return;
          moveThumb(getPos(e).x, getPos(e).y);
          e.preventDefault();
        },
        { passive: false }
      );

      window.addEventListener("touchend", (e) => {
        dragging = false;
        resetThumb();
      });

      circle.addEventListener("mousedown", (e) => {
        dragging = true;
        origin = { x: e.clientX, y: e.clientY };
        e.preventDefault();
      });

      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        moveThumb(e.clientX, e.clientY);
        e.preventDefault();
      });

      window.addEventListener("mouseup", (e) => {
        dragging = false;
        resetThumb();
      });