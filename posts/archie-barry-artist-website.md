---
title: Customising a Cargo Portfolio Site
isPublished: true
image: archie2.png
alt: A screenshot of Archie's website
tags:
  - freelance
---

My friend Archie is an incredible artist. I've been lucky to work with them on
multiple occasions: I created lighting design for a performance of theirs,
hand-soldered a custom mic preamp with laser-cut housing for another
performance, and gave creative consultation on sound and video projects. They
recently asked me to help them customise their artist portfolio site, and since
I've been moving towards work in web development, it seemed like a perfect
opportunity.

They had had the opportunity to have subsidised access to
[Cargo](https://cargo.site/), so we agreed this would be the best platform for
them to showcase their work. While I would have loved the opportunity to create
a site from scratch, I never want to add unnecessary complexity. Artists need
some kind of CMS to update their portfolios when they create a new work, so it
made sense to take advantage of the system Cargo offers. So instead, I was asked
to make customisations to an existing theme. Here is a screenshot of the Lecomte
theme I was asked to customise.

![A screenshot of the default Lecomte theme](/images/lecomte.png)

And here is a screenshot of the customised theme (work in progress).

![A screenshot of the customised theme](/images/archie2.png)

One interesting point in the process has been learning about using SVG Color
Matrix filters. I was asked to show the images for each art project in
monochromatic blue. On hover, the blue filter should be removed to show the
image in colour. Rather than simply replacing the image (which I thought could
create a delay in the second image rendering), I decided to try using CSS
filters to achieve the effect.

At first I tried converting the image to Sepia then shifting the hue, but the
way it shifted the colours didn't line up with the sample I was given. Instead I
tried using an SVG Color Matrix, and this has been more precise and effective.
Here is an article about the feature on
[CSS Tricks](https://css-tricks.com/color-filters-can-turn-your-gray-skies-blue/).

The completed site can be viewed at [archiebarry.com](https://archiebarry.com)
