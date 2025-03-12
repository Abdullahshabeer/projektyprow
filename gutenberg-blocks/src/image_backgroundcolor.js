const { MediaUpload, RichText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { Button, PanelBody, TextControl, SelectControl, CheckboxControl, TextareaControl } = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
import { useInstanceId } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

registerBlockType('giosnamespace/section-repeter-block', {
    title: stringData.image_section_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [],
        },

       
        selectdesign: {
            type: 'array',
            default: [
                {
                    value: '', // Unique value for style1
                    label: stringData.selected_image_side,
                },
                {
                    value: 'left', // Unique value for style1
                    label: stringData.left,
                },
                {
                    value: 'right', // Unique value for style1
                    label: stringData.right,
                },
                
            ],
        },
    },

    edit: ImageRepeaterBlockEdit,

    save: function ({ attributes }) {
        const { items,slideritems, selectdesign,upcomingchecbox } = attributes;
        const {selectheading} =  items;
        const headingTag = selectheading || 'h1';
        return (
            <>
                {items.map((item, index) => (
                        <div key={index}>
                            <div className="quiz-contain">
                                <div className="block-with-image light-bg" style={{ background: item.color }}>
                                    <div className={`row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`col-lg-${item.imgeurl ? '7' : '12'}`}>
                                            {item.sectionTitle && (
                                                <div className={"web-heading" + (item.upcomingchecbox ? " heading-divider" : "")}>
                                                    {item.selectheading && React.createElement(item.selectheading, { className: item.sectionTitle }, item.sectionTitle)}
                                                </div>
                                            )}
                                            {item.content && <p dangerouslySetInnerHTML={{ __html: item.content }}></p>}

                                            <InnerBlocks.Content />
                                            {item.innerbutton && (
                                                <div className="web-btn text-end">
                                                    <a href={item.link} className="btn btn-primary">
                                                        {item.innerbutton}
                                                    </a>
                                                </div>
                                            )}
                                            
                                        </div>
                                        {item.imgeurl && (
                                            <div className="col-lg-5">
                                                <div className="block-img">
                                                    <img src={item.imgeurl} alt={item.imgealt} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {item.button && (
                                    <div className="web-btn">
                                        <a href={item.linkexternal} className="btn btn-primary">
                                            {item.button}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
           
                </>
            
          
        );
      },
});


function ImageRepeaterBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { items,selectdesign } = attributes;
    const textareaRef = useRef(null);

    if (props.attributes.items.length === 0) {
        props.setAttributes({ items: [{ imgeurl: urlimage,
            style: '',
            color: '#EFF4F3',
            content: 'W celu wspólnej realizacji projektu, w zakresie określonym przez instytucję zarządzającą krajowym programem albo instytucję zarządzającą regionalnym programem, może zostać utworzone partnerstwo przez podmioty wnoszące do projektu zasoby ludzkie, organizacyjne, techniczne lub finansowe, realizujące wspólnie projekt, zwany dalej „projektem partnerskim”, na warunkach określonych w porozumieniu albo umowie o partnerstwie',
            button: '',
            link: '#',
            upcomingchecbox: false,
            selectheading:'h1',
            headings: '',
            sectionTitle: stringData.enter_heading,}] });
    }

    function addItem(index) {
        const newItem = {
            imgeurl: urlimage,
            imgealt: '',
            style: '',
            color: '#EFF4F3',
            content: 'W celu wspólnej realizacji projektu, w zakresie określonym przez instytucję zarządzającą krajowym programem albo instytucję zarządzającą regionalnym programem, może zostać utworzone partnerstwo przez podmioty wnoszące do projektu zasoby ludzkie, organizacyjne, techniczne lub finansowe, realizujące wspólnie projekt, zwany dalej „projektem partnerskim”, na warunkach określonych w porozumieniu albo umowie o partnerstwie',
            innerbutton: '',
            link: '#',
            upcomingchecbox: false,
            selectheading: 'h1',
            headings: '',
            sectionTitle: stringData.enter_heading,
        };
        return newItem;
    }

    function removeItem(index) {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setAttributes({ items: updatedItems });
    }

    function openMediaLibrary(index) {
        const mediaLibrary = wp.media({
            title: stringData.Select_an_image,
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                updateItem(index, 'imgeurl', media.url);
                updateItem(index, 'imgealt', media.alt);
            }
        });

        mediaLibrary.open();
    }

    function updateItem(index, key, value) {
        const updatedItems = [...items];
        updatedItems[index][key] = value;
        setAttributes({ items: updatedItems });
    }

    function addNewBlock() {
        const newItems = [...items, addItem(items.length)];
        setAttributes({ items: newItems });
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={stringData.image_block} >
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            <h3>section {index + 1}</h3>
                            <SelectControl
                                label={stringData.heading_style}
                                value={item.selectheading || 'h1'}
                                options={[
                                    {
                                        value: 'h1',
                                        label: stringData.Heading + '1',
                                    },
                                    {
                                        value: 'h2',
                                        label: stringData.Heading + '2',
                                    },
                                    {
                                        value: 'h3',
                                        label: stringData.Heading + '3',
                                    },
                                    {
                                        value: 'h4',
                                        label: stringData.Heading + '4',
                                    },
                                    {
                                        value: 'h5',
                                        label: stringData.Heading + '5',
                                    },
                                    {
                                        value: 'h6',
                                        label: stringData.Heading + '6',
                                    },
                                ]}
                                onChange={(newStyle) => updateItem(index, 'selectheading', newStyle)}
                            />
                            <div className="makeUpYourHeadingBlockTypeName">
                                <TextControl
                                    label={stringData.sectiont}
                                    value={item.sectionTitle}
                                    onChange={(newTitle) => updateItem(index, 'sectionTitle', newTitle)}
                                />
                            </div>
                            <div>
                                <CheckboxControl
                                    label={stringData.headerdivider}
                                    checked={item.upcomingchecbox}
                                    onChange={(newChecked) => updateItem(index, 'upcomingchecbox', newChecked)}
                                />
                            </div>
                            <Editor
                            label={stringData.Enter_a_description}
                            id={`custom-textarea-control-67`}
                            value={item.content}
                            ref={textareaRef}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'link',
                                    'lists', // Existing plugins
                                    // Add the code plugin
                                ],
                                toolbar: 
                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  lists | removeformat | help',  // Add 'code' to the toolbar
                                // Additional configuration to mimic TextareaControl styles if needed
                                
                            }}
                            onEditorChange={(value) => updateItem(index, 'content', value)}
                        />
                           
                            <TextControl
                                label={stringData.Background_color}
                                value={item.color}
                                onChange={(value) => updateItem(index, 'color', value)}
                            />
                            {item.imgeurl && (
                                <>
                                    <img src={item.imgeurl} alt="Image 1" className="mb-3" />
                                    <button onClick={() => updateItem(index, 'imgeurl', '')} className="button button-danger">
                                        {stringData.Delete_Image}
                                    </button>
                                </>
                            )}
                            


                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Select_an_image}</button>
                            <SelectControl
                                label={stringData.image_side}
                                value={item.style}
                                options={ selectdesign}
                                onChange={(value) => updateItem(index, 'style', value)}
                            />
                             {/* <TextControl
                                label={stringData.inner_button}
                                value={item.innerbutton}
                                onChange={(value) => updateItem(index, 'innerbutton', value)}
                            />
                            
                            <TextControl
                                label={stringData.Button_URLrt}
                                value={item.link}
                                onChange={(value) => updateItem(index, 'link', value)}
                            /> */}
                            {/* <button onClick={() => removeItem(index)} className="button button-danger">
                                {stringData.remove}
                            </button> */}
                        </div>
                    ))}
                     {/* <button onClick={addNewBlock} className="button button-primary">
                       {stringData.add_item}
                     </button> */}
                </PanelBody>
            </InspectorControls>
            {items.map((item, index) => (
                        <div key={index} className="block-with-image light-bg" style={{ background: item.color }}>
                            <div className={`row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`}>
                                <div className={`col-lg-${item.imgeurl ? '7' : '12'}`}>
                                    {item.sectionTitle && (
                                        <div className={"web-heading" + (item.upcomingchecbox ? " heading-divider" : "")}>
                                            {item.selectheading && React.createElement(item.selectheading, { className: item.sectionTitle }, item.sectionTitle)}
                                        </div>
                                    )}
                                    {item.content && <p dangerouslySetInnerHTML={{ __html: item.content }}></p>}
                                    <InnerBlocks />
                                </div>
                                {item.imgeurl && (
                                    <div className="col-lg-5">
                                        <div className="block-img">
                                            <img src={item.imgeurl} alt={item.imgealt} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                       
               
            ))}
           
        </>
    );
}