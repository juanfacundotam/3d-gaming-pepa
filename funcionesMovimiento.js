function updateAnimationWithJoystickRight(strafe, action, deltaTime) {
  if (!action) return;

  const threshold = 0.05;

  if (strafe > threshold) {
    if (!action.isRunning()) {
      action.reset();
      action.play();
    }

    action.setEffectiveWeight(1.0);
    action.setEffectiveTimeScale(THREE.MathUtils.mapLinear(strafe, threshold, 1, 0.2, 1));

    tiempoRight = action.time; // 🟢 actualizás acá el valor
  } else {
    if (action.isRunning()) {
      action.stop();
    }

    tiempoRight = 0; // 🔴 también lo limpiás si no hay strafe
  }
}