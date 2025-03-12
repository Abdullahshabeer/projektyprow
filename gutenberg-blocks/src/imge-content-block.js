const { MediaUpload, RichText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { Button, PanelBody, TextControl, SelectControl, CheckboxControl, TextareaControl } = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
const siteurl = myBlockData.siteUrl;
import { useEffect, useRef } from '@wordpress/element';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

registerBlockType('giosnamespace/img-content-block', {
    title: stringData.image_section_block,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        items: {
            type: 'array',
            default: [],
        },
       
    },

    edit: ImageRepeaterBlockEdit,

    save: function ({ attributes }) {
        const { items,slideritems, selectdesign,upcomingchecbox } = attributes;
        const {selectheading} =  items;
        const headingTag = selectheading || 'h1';
        return (
        <>
            <section class="block-with-image">
		<div class="container">
        {items.map((item, index) => (
			<div class={item.position === 'left' ? 'row custom-space flex-row-reverse' : 'row custom-space'}>
				<div class="col-lg-5">
					<div class="block-img">
                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
					</div>
				</div>
				<div class="col-lg-7">
					<div class="content">
                    {item.sectionTitle && (
						<div class={item.upcomingchecbox ? "web-heading heading-divider secondary" : "web-heading secondary"}>
							<h2>{item.sectionTitle}</h2>
						</div>
                    )}
						<RichText.Content
                                value={item.content}
                            />
						 {item.buttonlink && 
                            <div class="web-btn d-flex">
                                <a href= {item.buttonlink} class="link-btn">
                                    <span>{stringData.czytal}</span>
                                    <div class="icon">
                                        <img decoding="async" src={`${siteurl}/wp-content/plugins/ASgutenburg/images/${item.position}.svg`} alt="" aria-hidden="true"/>
                                    </div>    
                                </a>
                            </div>
                         }
                    <InnerBlocks.Content />
					</div>
				</div>
			</div>
        ))}
		</div>
	</section>
        </>
        );
      },
});


function ImageRepeaterBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { items,selectdesign } = attributes;
    const textareaRef = useRef(null);

    if (props.attributes.items.length === 0) {
        props.setAttributes({
            items: [{ 
            sectionTitle: 'Czym się zajmujemy',
            imgealt: '',
            upcomingchecbox: false,
            content: 'Dzięki Funduszom Europejskim w Małopolsce udało się wykonać już tysiące projektów. ',
            imgeurl: urlimage,
            background:'white',
            position:'right',
            selectheading: 'h2',
            buttonlink:'#',
        }] });
    }

    function addItem(index) {
        const newItem = {
            sectionTitle: 'Czym się zajmujemy',
            imgealt: '',
            upcomingchecbox: false,
            content: 'Dzięki Funduszom Europejskim w Małopolsce udało się wykonać już tysiące projektów. ',
            imgeurl: urlimage,
            background:'white',
            position:'right',
            selectheading: 'h2',
            buttonlink:'#',
        };
        return newItem;
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
    return (
        <>
            <InspectorControls>
                <PanelBody title={stringData.image_block} >
                    {items.map((item, index) => (
                        <div key={index} className="mb-3">
                            {/* <h3>section {index + 1}</h3> */}
                            <div className="makeUpYourHeadingBlockTypeName">
                                <TextControl
                                    label={stringData.Informacja_sectiont_title}
                                    value={item.sectionTitle}
                                    onChange={(newTitle) => updateItem(index, 'sectionTitle', newTitle)}
                                />
                            </div>
                            <div>
                                <CheckboxControl
                                    label={stringData.Informacja_headerdivider}
                                    checked={item.upcomingchecbox}
                                    onChange={(newChecked) => updateItem(index, 'upcomingchecbox', newChecked)}
                                />
                            </div>
                            {/* <RichText
                                tagName="p"
                                label={stringData.Informacja_Enter_a_description}
                                placeholder={stringData.Enter_a_description}
                                value={item.content}
                                onChange={(value) => updateItem(index, 'content', value)}
                            /> */}
                             <Editor
                                    label={stringData.Informacja_Enter_a_description}
                                    id="custom-textarea-cont"
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
                            <SelectControl
                                label={stringData.image_position}
                                value={item.position}
                                options={[
                                    { value: '', label: stringData.selected_image_position },
                                    { value: 'right', label: 'Prawo' },
                                    { value: 'left', label: 'Lewo' },
                                    
                                ]}
                                onChange={(value) => updateItem(index, 'position', value)}
                            /> 
                            
                            {item.imgeurl && (
                                <>
                                    <img src={item.imgeurl} alt="Image 1" className="mb-3" />
                                    <button onClick={() => updateItem(index, 'imgeurl', '')} className="button button-danger">
                                        {stringData.Informacja_Delete_Image}
                                    </button>
                                </>
                            )}
                            <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.Informacja_Select_an_image}</button>
                            
                             <TextControl
                              label={stringData.url}
                                value={item.buttonlink}
                                onChange={(newTitle) => updateItem(index, 'buttonlink', newTitle)}
                            />
                            
                        </div>
                    ))}
                    
                </PanelBody>
            </InspectorControls>
            <section class="block-with-image">
		<div class="container">
        {items.map((item, index) => (
			<div class={item.position === 'left' ? 'row custom-space flex-row-reverse' : 'row custom-space'}>
				<div class="col-lg-5">
					<div class="block-img">
                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
					</div>
				</div>
				<div class="col-lg-7">
					<div class="content">
                        {item.sectionTitle && (
                            <div class={item.upcomingchecbox ? "web-heading heading-divider secondary" : "web-heading secondary"}>
                                <h2>{item.sectionTitle}</h2>
                            </div>
                        )}
                            <RichText.Content
                                    tagName="p"
                                    value={item.content}
                                />
                                {item.buttonlink && 
                                    <div class="web-btn d-flex">
                                        <a href= {item.buttonlink} class="link-btn">
                                            <span>{stringData.czytal}</span>
                                            <div class="icon">
                                             <img decoding="async" src={`${siteurl}/wp-content/plugins/ASgutenburg/images/${item.position}.svg`} alt="" aria-hidden="true"/>
                                            </div>    
                                        </a>
                                    </div>
                                }
                            
                        <InnerBlocks />
					</div>
				</div>
			</div>
        ))}
		</div>
	</section>
    </>
    );
}