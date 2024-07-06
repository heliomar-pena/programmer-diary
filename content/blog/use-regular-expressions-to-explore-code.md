---
title: Utilizar expresiones regulares para explorar el código
date: 2024-07-02
authors:
  - heliomar
---
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

## Utilizando expresiones regulares para explorar el código

Para comenzar no es necesario conocer todos los carácteres especiales que existen. Yo empecé conociendo solamente 3 [clases de carácteres](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes) y [3 cuantificadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers).

### Clases de carácteres

> [!quote] 
> [Clases de carácteres](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes)
> Las clases de caracteres distinguen tipos de caracteres como, por ejemplo, distinguen entre letras y dígitos.

Las clases de carácteres que más utilizaba en ese entonces y aún sigo utilizando un montón, son las siguientes:

| Carácter | Significado                                                                                                                                                                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \w       | Busca cualquier caracter alfanumérico del alfabeto latino básico, incluido el caracter de subrayado. Equivalente a `[A-Za-z0-9_]`. Por ejemplo, `/\w/` coincide con "m" en "manzana", "5" en "$5.28", "3" en "3D" y "m" en "Émanuel".                                                       |
| \d       | Busca cualquier dígito (número arábigo). Equivalente a `[0-9]`. Por ejemplo, `/\d/` o `/[0-9]/` coincide con "2" en "B2 es el número de suite".                                                                                                                                             |
| \s       | Busca un solo caracter de espacio en blanco, incluido el espacio, tabulación, avance de página, avance de línea y otros espacios Unicode. Equivalente a `[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. Por ejemplo, `/\s\w*/` encuentra " bar" en "foo bar". |
### Cuantificadores

> [!quote]
> [Cuantificadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers)
> Los cuantificadores indican el número de caracteres o expresiones que deben coincidir.

Los cuantificadores que más utilizo son los siguientes:

| Carácter | Significado                                                                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x*       | Concuerda 0 o más veces con el elemento "x" anterior. Por ejemplo, `/bu*/` coincide con "buuuu" en "Un fantasma abuuuucheado" y "b" en "Un búho gorjeó", pero nada en "Una cabra gruñó". |
| x+       | Encuentra 1 o más veces el elemento "x" anterior Equivalente a `{1,}`. Por ejemplo, `/a+/` coincide con la "_a_" en "candy" y todas las "_a_"es en "caaaaaaandy".                        |
| x?       | Halla 0 o 1 vez el elemento "x" anterior. Por ejemplo, `/e?le?/` coincide con "el" en "ángel" y "ele" en "ángeles".                                                                      |

### Ejemplos de uso

#### Hallar colores de CSS que podrian crearsele variables

Imagina que estás refactorizando un código y algo que te gustaría mejorar es implementar el uso de [variables de CSS](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties) en los colores para poder cambiarlos fácilmente en un futuro. Debemos pensar que los colores en CSS se pueden [representar en varias maneras](https://developer.mozilla.org/es/docs/Web/CSS/color_value), como RGB, RGBA, HSL, HSLA, HEX (#XXX), HEX LARGO (#XXXXXX) y HEX con canal alpha (#XXXXXXXX).

Así que utilizaremos diferentes expresiones regulares para ir descubriendo los colores declarados de cada una de esas maneras y así poder cambiarlos en nuestro código.

**Hexadecimal:** `#[0-9a-zA-Z]+` - Con esta expresión regular podemos capturar todos los colores hexadecimales que hayan en nuestro código, desde la versión corta, hasta la versión con canal alpha.![[Pasted image 20240705211520.png]]

**RGB y RGBA**: `rgb(a)?\((\d+[,]?[\s]?){3,4}\)` - Con esta expresión regular podrás capturar todos los colores declarados utilizando el formato RGB y RGBA.![[Pasted image 20240705211943.png]]

**HSL y HSLA**: 

