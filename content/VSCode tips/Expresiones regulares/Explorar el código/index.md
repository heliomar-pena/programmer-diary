Utilizar expresiones regulares en VSCode puede ayudarte a explorar fácilmente un nuevo proyecto en el que estés empezado, así como ayudarte en refactors donde necesites cambiar el alguna parte del código en muchos lados a la vez.

Esta funcionalidad siempre ha sido parte de VSCode, pero normalmente no le hallamos utilidad al principio. Luego de 3 años de desarrollar con este editor de código he aprendido a utilizarla para ahorrar tiempo en diferentes situaciones.

Esto me ha ayudado a ahorrar un montón de tiempo en el trabajo, y es que si se aprende a usar bien ¡Puede servir para casi todo!.

Por eso hoy, te traigo ejemplos de uso donde me ha sido realmente útil para diferentes situaciones de la vida diaria. Junto a este artículo estaré publicando un cheatsheet con RegExp de utilidad que pueden servirte en diferentes situaciones.

> [!NOTE] ¿Qué son expresiones regulares?
> Las expresiones regulares son patrones que se utilizan para hacer coincidir combinaciones de caracteres en cadenas. Puedes leer mas acá:
>  https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions

## Como utilizar RegExp en VSCode

Para utilizar RegExp en Visual Studio Code, debes ubicar el ícono ![[Pasted image 20240701173728.png]]. Este ícono lo vas conseguir ya sea que estés realizando una búsqueda en un archivo abierto (normalmente inicias esta búsqueda presionando CTRL + F), como si realizas una búsqueda global en tu espacio de trabajo (que puedes iniciarla normalmente al presionar CTRL + SHIFT + F

| Búsqueda en archivo                  | Búsqueda global                      |
| ------------------------------------ | ------------------------------------ |
| ![[Pasted image 20240701174241.png]] | ![[Pasted image 20240701173920.png]] |
Para activarlo, solo debes darle click y notarás que resaltará en un color diferente (el color varía según el tema. Acá como se ve el mío:

| Búsqueda en archivo                  | Búsqueda global                      |
| ------------------------------------ | ------------------------------------ |
| ![[Pasted image 20240701174333.png]] | ![[Pasted image 20240701174348.png]] |
Una vez activo, ya podrás empezar a realizar búsquedas globalmente o en el archivo actualmente abierto utilizando expresiones regulares 
## ¿Qué son las expresiones regulares?

Una expresión regular está compuesta por una combinación de carácteres simples y carácteres especiales. 

Los carácteres simples ya los conocemos, son letras, números, símbolos, un ejemplo de combiación de carácteres simples podría ser alguna palabra como `Arroz`.

La limitación de los carácteres simples es que solamente funcionan para realizar búsquedas exactas. Por ejemplo si yo quisiera encontrar dónde crean una tabla en específico en las migraciones de un proyecto, tendría que saber cómo la crean para poder buscarla con el buscador global. Seguramente intentaría escribir `CREATE TABLE public.example_table` y cruzaría los dedos porque me apareciera algún resultado.

Por ello, cuando desees buscar algún texto que no conozcas a la perfección, o incluso quieras que en tu búsqueda aparezcan varios textos que tengan diferencias entre sí, puedes utilizar carácteres especiales. Los cuáles te permiten crear patrones de búsqueda más complejos y personalizados.

> [!TIP]
> Si quieres conocer todos los carácteres especiales que hay, y sus usos, puedes consultar la [documentación de MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions#usar_caracteres_especiales) que es muy buena y sencilla, o revisar la página [RegExr](https://regexr.com/) la cuál siempre consulto cuando creo nuevos RegExps y es de muy buena ayuda.

