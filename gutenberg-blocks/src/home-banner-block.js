const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl,TextareaControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
const iconurl                 = myBlockData.icon;
import { useEffect, useRef } from '@wordpress/element';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
// npm install --save tinymce
registerBlockType('kzrnamespace/homebanner', {
    title: stringData.list,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
        sectionTitle: {
            type: 'string',
            default: 'KZR INiG',
        },
       backgroundimage: {
            type: 'object',
            default: {
                imgurl: urlimage,
                imgealt: ''
            },
        },
        // bannervideo: {
        //     type: 'object',
        //     default: {
        //         videourl: urlimage,
        //         imgealt: ''
        //     },
        // },
		slideritems: {
            type: 'array',
            default: [
				{
					imgeurl:  urlimage,
                    imgealt: '',
					title: 'Dobre praktyki',
					link: ''
				  },
			],
        },
       
    },
    edit: ImageRepeaterBlockEdit,
    save: function ({ attributes }) {
        const { slideritems, sectionTitle, bannerdiscription, backgroundimage, bannervideo } = attributes
        return (
            <>
    <section class="home-main">
		<div class="container">
			<div class="home-main-inner">
				<div class="home-top-wrap white">
					<div class="row flex-row-reverse">
						<div class="col-lg-7">
							<div class="image">
                            <img src={attributes.backgroundimage.imgurl} alt={attributes.backgroundimage.imgealt ? attributes.backgroundimage.imgealt : ''} />
							</div>
						</div>
						<div class="col-lg-5">
							<div class="content">
								<div class="web-heading heading-divider">
                                 {attributes.sectionTitle && <h1>{attributes.sectionTitle}</h1> }
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="home-links-wrap">
					<div class="row">
                    {slideritems.map((item, index) => (
						<div class="col-lg-4">
							<div class="block-link-sec">
								<a href={item.link} class="d-flex align-items-center">
									<div class="icon-sec">
                                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
									</div>	
									<div>
                                     {item.title && <p>{item.title}</p> }
									</div>
								</a>
							</div>
						</div>
					))}	
					</div>
				</div>
			</div>
		</div>
	</section>
            </>     
        )
      },
})

function ImageRepeaterBlockEdit(props) {

    const { setAttributes, attributes } = props;
    const { slideritems, sectionTitle, bannerdiscription, backgroundimage, bannervideo } = attributes;
    const textareaRef = useRef(null);
   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    if (props.attributes.slideritems.length === 0) {
        props.setAttributes({ slideritems: [{ 
            imgeurl:  urlimage,
            svgContent:'',
            imgealt: '',
            title: 'Dobre praktyki',
            link: ''
        }] });
    }

    function addItemSec() {
        const newItem = {
            imgeurl:  urlimage,
            svgContent: '',
            imgealt: '',
            title: 'Dobre praktyki',
            link: ''
            
        };
       setAttributes({ slideritems: [...slideritems, newItem] }); 
    }

   

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
       setAttributes({ slideritems: updatedSliderItems });
    }

    
	function openMediaLibrarysecond(index) {
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                updateSliderItem(index, 'imgeurl', media.url);
                updateSliderItem(index, 'imgealt', media.alt);

                if (media.url.endsWith('.svg')) {
                    fetch(media.url)
                        .then(response => response.text())
                        .then(svgContent => {
                            updateSliderItem(index, 'svgContent', svgContent);
                        });
                } else {
                    updateSliderItem(index, 'svgContent', '');
                }
           
            }
        });

        mediaLibrary.open();
    }
    function openMediaLibrarybackground() {
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                setAttributes({
                    backgroundimage: {
                        imgurl: media.url,
                        imgealt: media.alt || ''
                    }
                });
            }
        });

        mediaLibrary.open();
    }

    // function openMediaLibraryvideo() {
    //     const mediaLibrary = wp.media({
            
    //         title: 'Select Video',
    //         library: { type: 'video' },
    //         multiple: false,
    //     });

    //     mediaLibrary.on('select', function () {
    //         const media = mediaLibrary.state().get('selection').first().toJSON();
    //         if (media && media.url) {
    //             setAttributes({
    //                 bannervideo: {
    //                     videourl: media.url,
    //                     imgealt: media.alt || ''
    //                 }
    //             });
    //         }
    //     });

    //     mediaLibrary.open();
    // }
    
   
    return (

        <>
         <InspectorControls>
            <PanelBody title={stringData.Kontakt_home_block}>
                <TextControl
                    label={stringData.banner_title}
                    value={attributes.sectionTitle}
                    onChange={(newTitle) => setAttributes({ sectionTitle: newTitle })}
                />
               
                 <h3>{stringData.backgrounimage} </h3>
                    {attributes.backgroundimage.imgurl && (
                        <img src={attributes.backgroundimage.imgurl} alt={attributes.backgroundimage.imgealt} className="mb-3" />
                    )}
                    <button onClick={openMediaLibrarybackground} className="button button-secondary">
                        {stringData.Select_an_image}
                    </button>
                    
                    
                    {/* <Button onClick={openMediaLibraryvideo} className="button button-secondary">
                        {stringData.select_video}
                    </Button> */}
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.shortcut} {index + 1}</h3>
                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                        <button onClick={() => openMediaLibrarysecond(index)} className="button button-secondary">{stringData.shorticon}</button>
                        <TextControl
                            label={stringData.shortcuttitle}
                            placeholder={stringData.Enter_a_title}
                            value={item.title}
                            onChange={(value) => updateSliderItem(index, 'title', value)}
                        />
                         <TextControl
                            label={stringData.shortcutlink}
                            placeholder={stringData.Enter_a_link}
                            value={item.link}
                            onChange={(value) => updateSliderItem(index, 'link', value)}
                        />
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.list_remove}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.list_add_iteme}</button>
                
            </PanelBody>
        </InspectorControls> 
        <section class="home-main">
		<div class="container">
			<div class="home-main-inner">
				<div class="home-top-wrap white">
					<div class="row flex-row-reverse">
						<div class="col-lg-7">
							<div class="image">
                            <img src={attributes.backgroundimage.imgurl} alt={attributes.backgroundimage.imgealt ? attributes.backgroundimage.imgealt : ''} />
							</div>
						</div>
						<div class="col-lg-5">
							<div class="content">
								<div class="web-heading heading-divider">
                                 {attributes.sectionTitle && <h1>{attributes.sectionTitle}</h1> }
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="home-links-wrap">
					<div class="row">
                    {slideritems.map((item, index) => (
						<div class="col-lg-4">
							<div class="block-link-sec">
								<a href={item.link} class="d-flex align-items-center">
									<div class="icon-sec">
                                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
									</div>	
									<div>
                                     {item.title && <p>{item.title}</p> }
									</div>
								</a>
							</div>
						</div>
					))}	
					</div>
				</div>
			</div>
		</div>
	</section>
	</>         
    );
}

    
