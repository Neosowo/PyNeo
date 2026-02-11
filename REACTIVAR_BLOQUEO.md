# Instrucciones: Reactivar Bloqueo de Unidades

## Para REACTIVAR el bloqueo de unidades:

Abrir el archivo: `C:\xampp\htdocs\NeoPY\js\app.js`

Ir a la línea 162-163 y cambiar:

```javascript
// BLOQUEO DESACTIVADO TEMPORALMENTE PARA PRUEBAS
const isLocked = false; // index > 0 && !progress[modules[index - 1].id];
```

Por:

```javascript
const isLocked = index > 0 && !progress[modules[index - 1].id];
```

Esto hará que las unidades vuelvan a bloquearse en secuencia (debes completar la unidad anterior para desbloquear la siguiente).
