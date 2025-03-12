
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
const right                 = myBlockData.right;
const file_icon                 = myBlockData.icontsvg;
import { useInstanceId } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

registerBlockType('kzrsnamespace/wigetdetail', {
    title: stringData.wigetdetail,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        TopsectionTitle:{
            type:'string',
            default:'PROW finansuje inwestycje',
        },
		slideritems: {
            type: 'array',
            default: [],
        },
       
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { slideritems,TopsectionTitle } = attributes;
        const className = attributes.className;
        return (
            <>
        
            <div class="sidebar">
                <div class="web-heading">
                    <h2>{TopsectionTitle}</h2>
                </div>
                <div class="sidebar-list">
                    <ul>
                    {slideritems.map((item, index) => (
                        <li>
                            <span><p>{item.title}</p></span>
                            <span>
                            <RichText.Content  value={item.content} />
                            </span>
                        </li>
                    ))} 
                        
                    </ul>
                </div>
            </div>
        
     </>     
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    const { setAttributes, attributes } = props;
    const { slideritems,TopsectionTitle  } = attributes;
    const textareaRef = useRef(null);

   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    if (props.attributes.slideritems.length === 0) {
        props.setAttributes({ slideritems: [{ 
            title: '66 mln zł',
            content:'na budowę dróg lokalnych',
            
        }] });
    }

    function addItemSec() {
        const newItem = {
            title: '66 mln zł',
            content:'na budowę dróg lokalnych',
           
        };
       setAttributes({ slideritems: [...slideritems, newItem] }); 
    } 
  
   

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
       setAttributes({ slideritems: updatedSliderItems });
    }

   
    
    return (

        <>
         <InspectorControls>
            <PanelBody title={stringData.Kontakt_home_block}>
               <TextControl
                    label={stringData.sectiontt}
                    value={TopsectionTitle}
                    onChange={(newTitle) => setAttributes({ TopsectionTitle: newTitle })}
                />
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.link} {index + 1}</h3>
                        <TextControl
                            label={stringData.link_content}
                            placeholder={stringData.Enter_a_title}
                            value={item.title}
                            onChange={(value) => updateSliderItem(index, 'title', value)}
                        />
                        <Editor
                            label={stringData.contactdetail}
                            id={`custom-textarea-control-${index}`}
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
                           
                            onEditorChange ={(value) => updateSliderItem(index, 'content', value)}
                        />
                        
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove_link}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_link}</button>
                
            </PanelBody>
        </InspectorControls> 
       
            <div class="sidebar">
                <div class="web-heading">
                    <h2>{TopsectionTitle}</h2>
                </div>
                <div class="sidebar-list">
                    <ul>
                    {slideritems.map((item, index) => (
                        <li>
                            <span><p>{item.title}</p></span>
                            <span>
                            <RichText.Content  value={item.content} />
                            </span>
                        </li>
                    ))} 
                        
                    </ul>
                </div>
            </div>
       
	</>         
    );
}