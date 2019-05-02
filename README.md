# Complex Content

Complex Content is a structure that defines the layout and grouping of sections, containers, and blocks. [Click here](https://pageworks.github.io/complex-content/) to see a visualization of how Complex Content is structured. [Click here](#) to see how Complex Content can be used to build a page.

# Structure

A valid Complex Content structure requires at least 1 section and 1 container or 1 complex component, however, it could contain an unlimited number of sections that can contain an unlimited number of containers that can contain an unlimited number of blocks.

## Block

A block is just a wrapper for a component or an object. Blocks will always match the width of the column that they're placed within.

Blocks can have custom rules for restricting the layout they're allowed to be placed in. For example, a product card carousel block can declare that it may only be placed in a container that does not have max-width smaller than it's section and only has a single column.

## Container

A container defines the maximum width that it can expand and number of columns that live within it. By default containers will always attempt to match the width of the section that they're within, however, their max-width value can prevent them from achieving full width.

Containers will always be horizontally centered within their section and a container will always contain 1 to 3 columns. Columns will always be split evenly within the container.

## Section

A section defines the background color or image and will always be 100% of the viewport width unless a maximum width is specified by the designer.

## Complex Component

A complex component is a predefined layout of at least 1 section that contains at least 1 container that contains at least 1 block.
