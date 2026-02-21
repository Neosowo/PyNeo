window.evaluations[5] = {
    id: 6,
    title: "Listas Paralelas (Supermercado)",
    difficulty: "intermedio",
    icon: "fa-shopping-cart",
    description: "Proyecto de Ayudantía 4: Gestión de ventas con listas paralelas.",
    timeLimit: 30,
    questions: [
        {
            id: 1,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">1. Buscar Índice de Producto</h4>
                <p class="text-gray-300 mb-2">Dada la lista: <code class="text-neon-green">productos = ["Arroz", "Leche", "Pan"]</code>.</p>
                <p class="text-gray-300 mb-2">Pide al usuario un producto (prompt: <code class="text-neon-green">"Producto: "</code>).</p>
                <p class="text-gray-300 mb-4">Usa <code class="text-neon-green">.index()</code> para encontrar su posición. Si no existe, captura el error (try/except) o verifica con <code class="text-neon-green">in</code>.</p>
                <p class="text-gray-300">Imprime el índice. Prueba con "Leche".</p>
            `,
            expectedOutput: "Producto: Leche\n1",
            points: 20
        },
        {
            id: 2,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">2. Validar Stock</h4>
                <p class="text-gray-300 mb-2">Define <code class="text-neon-green">validarStock(prod, cant, stocks, prods)</code>.</p>
                <p class="text-gray-300 mb-2">Retorna <code class="text-neon-green">True</code> si el stock en el índice del producto es >= cantidad.</p>
                <p class="text-xs text-gray-500">Datos: prods=["A", "B"], stocks=[10, 5].</p>
                <p class="text-gray-300">Prueba: validarStock("B", 3, stocks, prods) -> True. validarStock("B", 6...) -> False.</p>
                <p class="text-gray-300">Imprime el resultado de probar con "B" y 3.</p>
            `,
            expectedOutput: "True",
            points: 25
        },
        {
            id: 3,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">3. Proceso de Compra</h4>
                <p class="text-gray-300 mb-2">Listas: <code class="text-neon-green">prod=["A"], stock=[10], precio=[2.0]</code>.</p>
                <p class="text-gray-300 mb-2">Simula una compra: Pide producto ("A") y cantidad (2). Actualiza el stock (resta).</p>
                <p class="text-gray-300">Imprime el stock restante.</p>
                <p class="text-xs text-gray-500">Prompt: "Prod: ", "Cant: ".</p>
            `,
            expectedOutput: "Prod: A\nCant: 2\n[8]",
            points: 25
        },
        {
            id: 4,
            type: "code",
            question: `
                <h4 class="font-bold text-white mb-4">4. Calcular Factura</h4>
                <p class="text-gray-300 mb-2">Tienes una lista de compras (cantidades): <code class="text-neon-green">compras = [2, 0, 1]</code> (paralela a productos).</p>
                <p class="text-gray-300 mb-2">Precios: <code class="text-neon-green">precios = [2.5, 1.0, 5.0]</code>. Impuestos booleanos: <code class="text-neon-green">iva = [True, False, True]</code> (True=12%, False=0%).</p>
                <p class="text-gray-300 mb-4">Calcula el Total a Pagar con impuestos.</p>
                <p class="text-gray-300">Imprime el total redondeado a 2 decimales. (2*2.5*1.12 + 1*5.0*1.12 = 5.6 + 5.6 = 11.2).</p>
            `,
            expectedOutput: "11.20",
            points: 30
        }
    ]
};
