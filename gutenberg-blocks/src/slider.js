
const { MediaUpload,RichText } = wp.editor;
const { registerBlockType }    = wp.blocks;
const { InspectorControls }    = wp.editor;
const { Button,PanelBody,TextControl }     = wp.components;
const stringData               = myBlockData.strings;
const urlimage                 = myBlockData.defaultimge;
const right                 = myBlockData.right;
const file_icon                 = myBlockData.icontsvg;
registerBlockType('kzrsnamespace/links', {
    title: stringData.link,
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
    <section class={`${className}`}>
		<div class="container">
			<div class="web-heading heading-divider">
				<h2>{TopsectionTitle}</h2>
			</div>
			<div class="carousel-block">
				<div class="owl-carousel owl-theme finances-investments">
                  {slideritems.map((item, index) => (   
				    <div class="item">
				    	<div class="icon-card text-center">
                           <a href={item.link}>
								<div class="icon">
                                    <img  src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} aria-hidden="true" />
									
								</div>
								<div class="card-content">
									<h3>{item.title}</h3>
									<p>{item.content}</p>
								</div>
							</a>
				    	</div>
				    </div>
				 ))}  
				</div>
			</div>
		</div>
	</section>
     </>     
        );
      },
});

function ImageRepeaterBlockEdit(props) {

    const { setAttributes, attributes } = props;
    const { slideritems,TopsectionTitle  } = attributes;

   
    function updateSliderItem(index, key, value) {
        const updatedSliderItems = [...slideritems]; // Use a different variable name here
        updatedSliderItems[index][key] = value;
       setAttributes({ slideritems: updatedSliderItems }); // Update the slideritems attribute
    }

    if (props.attributes.slideritems.length === 0) {
        props.setAttributes({ slideritems: [{ 
            imgeurl:  file_icon,
            imgealt: '',
            title: '66 mln zł',
            content:'na budowę dróg lokalnych',
            link: '',  
        }] });
    }

    function addItemSec() {
        const newItem = {
            imgeurl:  file_icon,
            imgealt: '',
            title: '66 mln zł',
            content:'na budowę dróg lokalnych',
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
        const mediaLibrary = wp.media({
            title: 'Select Image',
            multiple: false,
        });

        mediaLibrary.on('select', function () {
            const media = mediaLibrary.state().get('selection').first().toJSON();
            if (media && media.url) {
                updateSliderItem(index, 'imgeurl', media.url);
                updateSliderItem(index, 'imgealt', media.alt);
            }
        });

        mediaLibrary.open();   
    }
   
    
    return (

        <>
         <InspectorControls>
            <PanelBody title={stringData.Kontakt_home_block}>
               <TextControl
                    label={stringData.tytu}
                    value={TopsectionTitle}
                    onChange={(newTitle) => setAttributes({ TopsectionTitle: newTitle })}
                />
                {slideritems.map((item, index) => (
                    <div key={index} className="mb-3">
                        <h3>{stringData.slider} {index + 1}</h3>
                        {item.imgeurl && <img src={item.imgeurl} alt="Image 1" className="mb-3" />}
                        <div className="blockbutton">
                         <button onClick={() => openMediaLibrary(index)} className="button button-secondary">{stringData.link_icon}</button>
                        </div>
                        <TextControl
                            label={stringData.tytu}
                            placeholder={stringData.Enter_a_title}
                            value={item.title}
                            onChange={(value) => updateSliderItem(index, 'title', value)}
                        />
                        <TextControl
                            label={stringData.opis}
                            placeholder={stringData.Enter_a_title}
                            value={item.content}
                            onChange={(value) => updateSliderItem(index, 'content', value)}
                        />
                        <TextControl
                            label={stringData.link_url}
                            placeholder={stringData.Enter_a_title}
                            value={item.link}
                            onChange={(value) => updateSliderItem(index, 'link', value)}
                        />
                        <button onClick={() => removeSliderItem(index)} className="button button-danger">{stringData.remove_link}</button>
                    </div>
                ))}
                <button onClick={addItemSec} className="button button-primary">{stringData.add_link}</button>
                
            </PanelBody>
        </InspectorControls> 
        <section class="finances-investments-sec">
            <div class="container">
                <div class="web-heading heading-divider">
                    <h2>{TopsectionTitle}</h2>
                </div>
                <div class="carousel-block">
                    <div class="owl-carousel owl-theme finances-investments">
                    {slideritems.map((item, index) => (   
                        <div class="item">
                            <div class="icon-card text-center">
                                <a href={item.link}>
                                    <div class="icon">
                                        <img  src={item.imgeurl} alt={item.imgealt ? item.imgealt : ''} aria-hidden="true" />
                                        
                                    </div>
                                    <div class="card-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}  
                    </div>
                </div>
            </div>
	    </section>
	</>         
    );
}