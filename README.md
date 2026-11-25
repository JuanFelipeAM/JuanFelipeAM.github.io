# Adritian-Free-Hugo-Theme

**Minimalistic and clean theme for Hugo, great for Single Page personal websites or landing pages. With custom types for blog, portfolio, and content shortcodes.**

This site is based on the [demo](https://github.com/zetxek/adritian-demo) website using the theme [Adritian-Free-Hugo-Theme](https://github.com/zetxek/adritian-free-hugo-theme) authored by Adrián Moreno Peña.

**Theme made available under:**

The MIT License (MIT)

Copyright for portions of the theme are held by (c) 2020 Radity (https://radity.com). Other copyright is held by Adrián Moreno Peña, 2022.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


**Demo made available under:**

MIT License

Copyright (c) 2024 Adrián Moreno Peña

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
# This is to keep track of the changes that I need to make to have a working website.
## The idea is to keep the theme either as a local copy (what I currently use) or imported from github and create assets and layovers that override the ones from the theme.<br><br>I want to keep the overrides minimal to avoid conflicts and to have an easier to read code.

List of changed files:

1. \layouts\partials\footer.html
1. \layouts\partials\header.html
1. \layouts\partials\showcase.html
1. \layouts\partials\head.html (maybe not)
1. \layouts\shortcodes\text_section.html (maybe not)
1. \assets\css\custom.css
1. \assets\scss\_raditian.scss
1. \assets\scss\adritian.scss



## \layouts\ &nbsp;:
### partials\footer.html :

Here I want to toggle showing the content menu in the footer. So, need a variable that will be controlled from hugo.toml, and conditional clauses that handle true/false.

When the menu is not shown, the footer copy should expand and take over the space of the menu.

```{{- $showFooterMenu := .Site.Params.footer.showMenu | default true -}}<!-- Adding option to hide footer menu -->``` This is added at the beginning.

```<div class="footer_left col-12 {{ if $showFooterMenu }}col-lg-4{{ else }}col-lg-10{{ end }} mb-3 mb-lg-0 text-center text-wrap"><!-- Width of footer_left conditional on the showFooterMenu variable, and made the text centered -->``` This replaces the similar instance.

```<!-- Adding a wrapper in front of footer menu render -->```<br>
```{{- if $showFooterMenu -}}``` Only need to render the menu piece if ```footer.showMenu``` is true.

I also want to load MathJax and I did it in the footer in the website online.

```<!-- Math rendering: MathJax v3 configured to recognize `$...$` inline math. -->```<br>
```<script>```<br>
```  window.MathJax = {```<br>
```    tex: {```<br>
```      inlineMath: [['$','$'], ['\\(','\\)']],```<br>
```      displayMath: [['$$','$$'], ['\\[','\\]']]```<br>
```    },```<br>
```    options: {```<br>
```      skipHtmlTags: ['script','noscript','style','textarea','pre','code']```<br>
```    }```<br>
```  };```<br>
```</script>```<br>
```<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>``` All of this goes at the end, after ```</footer>```

<br>

### partials\header.html :

Here I want to toggle showing Email button and Search button in the header. So, need a variable that will be controlled from hugo.toml, and conditional clauses that handle true/false.

I also add ```&ensp;``` between logo_text1 and logo_text2 so I can keep them separate.


```{{- $hideEmailButton := .Site.Params.header.hideEmailButton | default true -}}<!-- JFAM edit: Adding option to hide email button in the header -->```<br>
```{{- $hideSearchButton := .Site.Params.header.hideSearchButton | default true -}}<!-- JFAM edit: Adding option to hide search button in the header -->``` This is added at the beginning.

```<span>{{ $logoText1 }}</span>&ensp;<!-- JFAM edit: added space &ensp -->``` Replaces the corresponding line.

```{{- range .Site.Menus.header }}```<br>
```              {{- if .Pre -}}```<br>
```                {{- if and (eq .Pre "email") ($hideEmailButton) }}<!-- JFAM edit: Modified this so a space is not created for a hidden menu button -->```<br>
```                {{- else if and (eq .Pre "search") ($hideSearchButton) }}```<br>
```                {{- else -}}```<br>
```                  <li class="nav-item">```<br>
```                  <a data-scroll class="nav-link" href="{{ .URL | relURL }}">```<br>
```                  <i class="icon-{{ .Pre }}" aria-hidden="true"></i>```<br>
```                  <span class="visually-hidden">{{ .Name | default .Pre }}</span>```<br>
```                  </a>```<br>
```                  </li>```<br>
```                {{- end -}}```<br>
```              {{- else -}}```<br>
```                <li class="nav-item">```<br>
```                <a data-scroll class="nav-link" href="{{ .URL | relURL }}">```<br>
```                {{ .Name | upper }}```<br>
```                </a>```<br>
```                </li>```<br>
```              {{- end -}}```<br>
```            {{- end }}``` This replaces the range over menu items. Basically need to check if a menu item has ```pre = "email"``` or ```pre = "search"``` and ignore them depending on the hide Button parameter.

<br>

### partials\showcase.html :

Here I want to:
1. Use "inner" in the content of the page using this layout, so that I only need to write markdown.
2. Use a single column format with a picture that is rendered on the top right corner and text that starts on the left wraps around the image.

```{{- $innerTrim := trim $inner "\n\r\t " -}}``` Use this near the top because I suspect the markdown is read with a space \n at the start.

```<div class="showcase-section rad-fade-down rad-waiting rad-animate">```<br>
```      <div class="profile-image{{ if $imgShape }} profile-image--{{ $imgShape }}{{ end }}">```<br>
```        {{ partial "lazypicture" (dict "src" $imgSrc "width" $imgWidth "height" $imgHeight "scale" $imgScale "eager" true "sizes" "(min-width: 768px) 50vw, 100vw")}}```<br>
```      </div>``` Up to here is used to get rid of the columns and show picture and text in the same frame.<br>
```{{- if ne $innerTrim "" }}```<br>
```        <div class="inner-content">``` The class inner-content is later used in custom.css to define the font style in showcase pages rendered with markdown.<br>
```          {{ $innerTrim | markdownify }}``` Use this in the place needed to markdownify.<br>
```        </div>```<br>
```      {{- else }}``` And revert to the theme behavior under ```else```.

```<div class="row platform-links">``` delete ```row``` since no longer using columns.<br>
```      <div class="col-12">``` This and the ```</div>``` is removed since not using columns.

<br>

### shortcodes\text_section.html :
The change here is so text section content has a special class and can be modified (font, etc.) from custom.css.

<br>

### partials\head.html :
I think the change here is between the version of the theme in my website and the latest version.
## 


## \assets\ &nbsp;:

### css\custom.css :

1. showcase layout has to float the image to the right and wrap the text around it. It should also unfloat the image when the screen width is smaller than 768px


### scss\_raditian.scss :

```html body {overflow: hidden;}``` Removed.

```.header + .section {margin-top: 120px;}``` Removed.

```.header {padding-top: 8px;}``` New value (also changed to this inside ```@media (min-width: 992px) ```).

Modified ```.header .navbar-brand span:nth-child(2)``` so it behaves like first-child.

```@media (min-width: 768px) and (max-width: 991.98px) {.header .navbar-brand span:first-child, .header .navbar-brand span:nth-child(2) {font-size: 37px;}}``` Changed font-size and made min-max rules strict and clearly defined.



### scss\adritian.scss :
