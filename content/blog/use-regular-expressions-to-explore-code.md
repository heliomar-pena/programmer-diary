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

##### Hexadecimal `#[0-9a-fA-F]{3,8}`

Con esta expresión regular podemos capturar todos los colores hexadecimales que hayan en nuestro código, desde la versión corta, hasta la versión con canal alpha.![[Pasted image 20240706110818.png]]

Funciona de la siguiente manera:

- `#`: Es un caracter simple, simplemente busca por textos que contengan el caracter `#`
- `[]`: Es una [clase de caracteres](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class). Hace que el RegExp capture cualquiera de los elementos dentro del conjunto de caracteres
- `{3,8}`: Es un [cuantificador](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers). Indica a la expresion regular que deseamos que las coincidencias de la clase de caracteres anterior se repitan entre 3 y 8 veces.
- `0-9`: Esto está dentro de la clase de carácteres. Es una forma de decir que quiero todos los números del 0 al 9
- `a-f`: Significa que quiero obtener todos los carácteres entre a y f. Es útil ya que las expresiones regulares solo admiten los carácteres: a, b, c, d, e, f
- `A-F`: Lo mismo que el de arriba, pero en mayúscula.

##### RGB y RGBA `rgba?\(([0-9]{1,3},? ?){3,4}\)`

Con esta expresión regular podrás capturar todos los colores declarados utilizando el formato RGB y RGBA.

![[Pasted image 20240707180444.png]]

Funciona de la siguiente manera:

- `rgb`: Son caracteres simples, buscar por textos que contengan las letras rgb
- `a?`: Es un caracter simple en combinacion de un cuantificador que indica que debe buscar tanto textos que incluyan la a como los que no. Esto permite aceptar `rgba` y `rgb` como entrada
- `\(`: El `\` es un escape de carácter, lo que me permite utilizar `(` como un simple paréntesis, en vez de que se convierta en un caracter especial. Esto indica que queremos obtener algun resultado donde abra un parentesis luego de rgb(a).
- `([0-9]{1,3},? ?){3,4}`: Es un grupo que contiene una [clase de carácteres](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) que indica que desea obtener un dígito entre 0 y 9. Esta clase de carácteres está siendo afectada por un cuantificador que exige que se repita mínimo 1 vez el patrón y máximo 3 veces. Esto permite que hayan números entre 1 hasta 999. Luego, se solicita que el patrón acepte una coma o un espacio, ambos son opcionales. Permitiendo que sean validas entradas como `1`, `100,` o `999, `.  Por último, solicitamos que ésto se repita entre 3 a cuatro veces, si se repite solo 3 veces es porque son los canales RED, BLUE y GREEN del RGB. Y si se repite 4 veces es porque incluye el canal ALPHA, el cual es el que se encarga de la transparencia. 
- `\)`: Solicita que el patrón tenga un cierre de paréntesis.
##### **HSL y HSLA**: `hsla?\((\d{1,3}(deg|rad|grad|turn|%)?,? ?){3}\)`

Con esta expresión regular podrás capturar todos los colores declarados en formato HSL y HSLA

![[Pasted image 20240707181935.png]]

Funciona de la siguiente manera:

- `hsl`: Son caracteres simples, buscar por textos que contengan las letras hsl
- `a?`: Es un caracter simple en combinacion de un cuantificador que indica que debe buscar tanto textos que incluyan la a como los que no. Esto permite aceptar `hsla` y `hsl` como entrada
- `\(`: El `\` es un carácter de descape, lo que me permite utilizar `(` como un simple paréntesis, en vez de que se convierta en un caracter especial. Esto indica que queremos obtener algun resultado donde abra un parentesis luego de rgb(a).
- `(\d{1,3}(deg|rad|grad|turn|%)?,? ?`: `\d` indica que queremos un dígito (del 0-9, es lo mismo que utilizar `[0-9]`), `{1,3}` es un cuantificador que indica que queremos que `\d` se repita de 1 a 3 veces. `(deg|rad|grad|turn|%)` es un grupo donde utilizamos el [carácter de disyunción](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) para indicar que queremos obtener cualquiera de esos valores: deg, rad, grad, turn o %. `?` indica que los valores anteriormente mencionados son opcionales. Luego, solicitamos un caracter de coma o de espacio pero damos la oportunidad de que sean opcionales, esto porque el HSL puede ser separado con o sin comas, y en el caso de las comas los espacios son opcionales.
- `\)`: Solicita que el patrón tenga un cierre de paréntesis.

##### Conclusión

De esta manera podremos obtener una gran cantidad de colores que esté declarada en nuestro código y así poder utilizar la información para futuros refactoreos, como agregar variables de CSS en lugar de codificar los colores cada vez que los necesitemos.

#### Hallar lugares donde se importa algún archivo

Ahora imaginemos que pasamos de trabajar con CSS a trabajar con JS. Tenemos que cambiar el nombre a algún archivo o simplemente queremos saber dónde se utiliza para hallar ejemplos de cómo utilizar alguna función declarada dentro del archivo.

Para esto, la mayoría del tiempo podremos simplemente buscar `nombre-del-archivo.js` en el buscador. Pero cada vez es más común ver que las extensiones de archivos de JS son omitidas, y solo se agregan las extensiones de archivos diferentes como css, json, etc... 

![[Pasted image 20240707182811.png]]

Esto complica un poco el trabajo, ya que imaginemos el archivo `CreditCardForm`, si lo buscamos en el proyecto actual que estoy utilizando de ejemplo, hallaremos 3 archivos donde se nombra:
![[Pasted image 20240707182940.png]]
1. El primer archivo que hallamos es el archivo donde se declara, dentro tiene 4 resultados, pero ninguno de esos son lo que queremos hallar que es la importación del archivo.
2. El segundo resultado es `index.js`, acá podemos ver que obtenemos la importación y también el uso, diría que lo único que nos interesa acá es la importación, así que de 3 resultados de este archivo solo es interesante 1 de ellos.
3. El tercer resultado es un archivo de CSS, donde se utiliza 10 veces como nombre de selector. Por lo que este resultado tampoco es relevante.

Y esto es un proyecto relativamente pequeño, de 1 sola página de vista al usuario. Si actualmente estás trabajando como programador, sabrás que el código fuente de los proyectos de la mayoría de las empresas no es tan corto. Y si estuvieras en una situación similar, seguramente obtendrías un montón de resultados donde sería difícil buscar.

Es por eso que en este caso en específico, podríamos ayudarnos con las expresiones regulares para la exploración del código.

Dependiendo de si estamos usando `import` o `require` podría cambiar el regexp completamente. Pero no es algo que complique demasiado la expresión.

##### Buscar importacion con Require

1. Empezamos con usar carácteres simples para definir lo que queremos buscar: `require`
2. Abrimos paréntesis `\(`
3. Abrimos comillas: como las comillas usadas podrían ser dobles o simples, podemos incluirlas en una [clase de carácter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) para permitir cualquiera de las dos. Nos quedaría algo así: `["']`
4. Buscamos cualquier carácter dentro de los paréntesis, ya que normalmente la ruta cambia, puede ser relativa o absoluta. `\D+`
5. Usamos carácteres simples para definir el nombre del archivo que queremos buscar: `CreditCardForm`
6. Si queremos más seguridad de que no nos perdemos ningún resultado, podemos agregar la extensión del archivo como parámetro opcional en la búsqueda `(.js)?`
7. Cerramos paréntesis y comillas `["']\)`

Nos quedaría algo así: `require\(["']\D+CreditCardForm(.js)?["']\)`

![[Pasted image 20240707183953.png]]

##### Buscar importación con Import

1. Empezamos con usar carácteres simples para definir lo que queremos buscar: `import`
2. Probablemente luego de la palabra clave `import` vayan nombres de funciones y variables que no podemos predecir, por lo que indicamos que queremos obtener cualquier carácter luego de import. `\D+`
4. Abrimos comillas: como las comillas usadas podrían ser dobles o simples, podemos incluirlas en una [clase de carácter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class) para permitir cualquiera de las dos. Nos quedaría algo así: `["']`
5. Buscamos cualquier carácter dentro de las comillas, ya que normalmente la ruta cambia, puede ser relativa o absoluta. `\D+`
6. Usamos carácteres simples para definir el nombre del archivo que queremos buscar: `CreditCardForm`
7. Si queremos más seguridad de que no nos perdemos ningún resultado, podemos agregar la extensión del archivo como parámetro opcional en la búsqueda `(.js)?`
8. Cerramos comillas `["']`

Nos quedaría algo asi: `import\D+["']\D+CreditCardForm(.js)?["']`

![[Pasted image 20240707184525.png]]
##### Conclusion

De esta manera lograremos evitar la mayor cantidad de resultados irrelevantes posibles. Creando un RegExp sencillo que haga nuestra búsqueda más explícita y acertada. Facilitando la exploración del código sobretodo en proyectos nuevos donde no conozcamos mucho sobre el código fuente y apenas estemos aprendiendo de él.
