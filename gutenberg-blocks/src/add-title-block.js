const { PanelBody, SelectControl, TextControl, CheckboxControl, ColorPalette } = wp.components;
const { InspectorControls } = wp.blockEditor; // Use wp.blockEditor instead of wp.editor for modern blocks
const stringData = myBlockData.strings;

wp.blocks.registerBlockType('kzrnamespace/heading-bloc', {
    title: stringData.Section_headin,
    icon: 'heading',
    category: 'my-custom-category',
    attributes: {
        sectionTitle: {
            type: 'string',
            default: stringData.enter_headingg,
        },
        headings: {
            type: 'string',
            default: '',
        },
        selectheading: {
            type: 'string',
            default: 'h1',
        },
        upcomingchecbox: {
            type: 'boolean',
            default: false,
        },
        content: {
            type: 'string',
            default: '',
        },
        titleColor: { // New attribute for color
            type: 'string',
            default: '#000', // Default color black
        },
    },
    edit: HeadingBlockEdit,
    save: function ({ attributes }) {
        const { selectheading, sectionTitle, upcomingchecbox, titleColor } = attributes;
        const headingTag = selectheading || 'h1';
      
        return (
            <div
                className={"web-heading" + (upcomingchecbox ? " heading-divider" : "")}
                style={{ borderColor: titleColor }} // Apply the border color
            >
                {headingTag && React.createElement(headingTag, { style: { borderColor: titleColor } }, sectionTitle)}
                <span style={{ backgroundColor: titleColor }}></span>
            </div>
        );
    },
});

function HeadingBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { selectheading, sectionTitle, upcomingchecbox, titleColor } = attributes;
    const headingTag = selectheading || 'h1';

    // Function to handle color change
    const onChangeTitleColor = (newColor) => {
        setAttributes({ titleColor: newColor });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={stringData.panelHeading}>
                    <SelectControl
                        label={stringData.heading_style}
                        value={selectheading}
                        options={[
                            { value: 'h1', label: stringData.Heading + '1' },
                            { value: 'h2', label: stringData.Heading + '2' },
                            { value: 'h3', label: stringData.Heading + '3' },
                            { value: 'h4', label: stringData.Heading + '4' },
                            { value: 'h5', label: stringData.Heading + '5' },
                            { value: 'h6', label: stringData.Heading + '6' },
                        ]}
                        onChange={(newStyle) => setAttributes({ selectheading: newStyle })}
                    />
                    <TextControl
                        label={stringData.sectiontt}
                        value={sectionTitle}
                        onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })}
                    />
                    <CheckboxControl
                        label={stringData.headerdivider}
                        checked={upcomingchecbox}
                        onChange={(newChecked) => setAttributes({ upcomingchecbox: newChecked })}
                    />
                    {/* Color picker for title color */}
                    <div>
                        <strong>{stringData.chooseTitleColor}</strong>
                        <ColorPalette
                            label={stringData.headerdividercolor}
                            value={titleColor}
                            onChange={onChangeTitleColor}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
            {/* Frontend preview within the editor */}
            <div
                className={"web-heading" + (upcomingchecbox ? " heading-divider" : "")} // Apply border color to preview in the editor
            >
                
                {headingTag && React.createElement(headingTag, { style: { borderColor: titleColor } }, sectionTitle)}
                <span style={{ backgroundColor: titleColor }}></span>
            </div>
        </>
    );
}
