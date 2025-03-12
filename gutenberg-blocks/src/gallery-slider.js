
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
const right                 = myBlockData.right;
const file_icon                 = myBlockData.icontsvg;
registerBlockType('kzrsnamespace/galleryslide', {
    title: stringData.galleryslider,
    icon: 'smiley',
    category: 'my-custom-category',
    attributes: {
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
             <div className={`gallery-slider ${className}`}>
                <div className="owl-carousel owl-theme owl-slider-main">
                    {slideritems.map((item, index) => {
                        const totalindex = index + 1;
                        return (
                            <div className="item" key={index}>
                                <div className="image">
                                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
                                </div>
                                <div className="img-caption">
                                    <div className="slider-counter">zdjęcie {totalindex} z {slideritems.length}</div>
                                    <div className="content">
                                    {item.title && <span>Źródło danych: {item.title}</span>}
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })} 
                </div>

                <div className="owl-carousel owl-theme owl-slider-thumbnail">
                    {slideritems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
                        </div>
                    ))}  
                </div>
            </div>
  
     </>     
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    const { setAttributes, attributes } = props;
    const { slideritems  } = attributes;

   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    if (props.attributes.slideritems.length === 0) {
        props.setAttributes({ slideritems: [{ 
            imgeurl:  urlimage,
            imgealt: '',
            title: '',
            content:'',
            link: '',  
        }] });
    }

    function addItemSec() {
        const newItem = {
            imgeurl:  urlimage,
            imgealt: '',
            title: '',
            content:'',
            link: '', 
        };   
       setAttributes({ slideritems: [...slideritems, newItem] }); 
    } 
  
   

    function removeSliderItem(index) {
        const updatedSliderItems = [...slideritems];
        updatedSliderItems.splice(index, 1);
       setAttributes({ slideritems: updatedSliderItems });
    }

    function openMediaLibrary(index) {
        const currentImageURL = slideritems[index]?.imgeurl;
    
        // Initialize the media library frame
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
            library: { type: 'image' },
        });
    
        // Pre-select the current image if it exists
        mediaLibrary.on('open', function () {
            if (currentImageURL) {
                wp.ajax.post('fetch_attachment_id_by_url', { image_url: currentImageURL })
                    .done(function (response) {
                        if (response && response.id) {
                            const selection = mediaLibrary.state().get('selection');
                            const attachment = wp.media.attachment(response.id);
                            attachment.fetch();
                            selection.add(attachment);
                        }
                    })
                    .fail(function () {
                        console.error('Failed to fetch attachment ID.');
                    });
            }
        });
    
        // Update the image details when a new image is selected
        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                updateSliderItem(index, 'imgeurl', media.url);
                updateSliderItem(index, 'imgealt', media.alt || '');
            }
        });
    
        mediaLibrary.open();
    }
    
    
    
   
    
    return (

        <>
         <InspectorControls>
            <PanelBody title={stringData.Kontakt_home_block}>
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.galleryslider} {index + 1}</h3>
                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                        <div className="blockbutton">
                         <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.link_icon}</button>
                        </div>
                        <TextControl
                            label={stringData.author_name}
                            placeholder={stringData.Enter_a_title}
                            value={item.title}
                            onChange={(value) => updateSliderItem(index, 'title', value)}
                        />
                        <TextControl
                            label={stringData.short_description}
                            placeholder={stringData.Enter_a_title}
                            value={item.content}
                            onChange={(value) => updateSliderItem(index, 'content', value)}
                        />
                       
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove_gallery}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_gallery}</button>
                
            </PanelBody>
        </InspectorControls> 
            <div className="gallery-slider">
                <div className="owl-carousel owl-theme owl-slider-main">
                    {slideritems.map((item, index) => {
                        const totalindex = index + 1;
                        return (
                            <div className="item" key={index}>
                                <div className="image">
                                    <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
                                </div>
                                <div className="img-caption">
                                    <div className="slider-counter">zdjęcie {totalindex} z {slideritems.length}</div>
                                    <div className="content">
                                        {item.title && <span>Źródło danych: {item.title}</span>}
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })} 
                </div>

                <div className="owl-carousel owl-theme owl-slider-thumbnail">
                    {slideritems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} />
                        </div>
                    ))}  
                </div>
            </div>
	</>         
    );
}
                   