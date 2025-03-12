const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls, RichText } = wp.editor;
const { Button, PanelBody,TextareaControl , TextControl,SelectControl,CheckboxControl } = wp.components;
const { useState } = wp.element;
const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;
import { useInstanceId } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

registerBlockType('prownamespace/kontact', {
  title: stringData.kontakt_block,
  icon: 'smiley',
category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [],
    },
  },
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files, postsectiontitle } = attributes;

    return (
    <div className="content-with-map light-bg ff" >    
        {files.map((file, parentIndex) => (
            <>
                {file.sectiontitle && (
                    (file.selectheading ? <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                    {file.selectheading && React.createElement(file.selectheading, { className: file.sectiontitle }, file.sectiontitle)}
                    </div> : 
                    <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                      <h1> {file.sectiontitle}</h1>
                    </div> )
                )}
                <div class="contact-detail">
                    {file.sectioncontent ? ( <RichText.Content  value={file.sectioncontent} /> ) : null}
                    <ul>
                       {file.nestedItems.map((nestedItem) => (
                            <li>
                                {nestedItem.fileUrl && (<img src={nestedItem.fileUrl} alt={nestedItem.imgalt} />)}
                                <div class="content">
                                  {nestedItem.title ? (<RichText.Content  value={nestedItem.title} /> ) : null}
                                </div>
                                
                            </li>
                        ))}
                   </ul>
                </div>
               {file.shortcode && <div class="map-sec">{file.shortcode}</div>}
           </>    
        ))}
    </div>    
    );
  },
});

function CustomBlockEdit(props) {
  const { attributes, setAttributes } = props;
  const { files } = attributes;
  const instanceId = useInstanceId(CustomBlockEdit);
  const textareaRef = useRef(null);

  const updateItem = (index, key, value) => {
    const newFiles = [...files];
    newFiles[index][key] = value;
    setAttributes({ files: newFiles });
};

  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].imgalt = media.alt;
      setAttributes({ files: newFiles });
     
    }
  };
  if (props.attributes.files.length === 0) {
    props.setAttributes({
        files: [
          ...files,
          {
            sectiontitle: 'Dane kontaktowe',
            upcomingchecbox: false,
            selectheading: '',
            sectioncontent:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
           
            nestedItems: [], // An array for nested items
            shortcode: '',
          },
        ],
      });
}


  const addFile = (parentIndex) => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems = [
      ...newFiles[parentIndex].nestedItems,
      {
        title: 'New Item Title',
        imgalt: '',
        fileUrl: imgurl,
        uniqueid: newUniqueId,
      },
    ];
    setAttributes({ files: newFiles });
  };

  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({ files: newFiles });
  };
  const removeImage = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
    setAttributes({ files: newFiles });
  };

  

  

  return (
    <>
    <div class="content-with-map light-bg">
    
      <InspectorControls>
        <PanelBody title={stringData.contact_block}>
          {files.map((file, parentIndex) => (
            <div key={parentIndex} className="mt-2">
              <TextControl
                type="text"
                label={stringData.sectiontt}
                placeholder={stringData.Enter_a_title}
                value={file.sectiontitle}
                onChange={(newStyle) => updateItem(parentIndex, 'sectiontitle', newStyle)}
              />
               <SelectControl
                    label={stringData.heading_style}
                    className="margintop"
                    value={file.selectheading || 'h1'}
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
                    onChange={(newStyle) => updateItem(parentIndex, 'selectheading', newStyle)}
                />
                <div>
                   <CheckboxControl
                    label={stringData.headerdivider}
                    checked={file.upcomingchecbox}
                    onChange={(value) => updateItem(parentIndex, 'upcomingchecbox', value)}
                    />
                </div>
                <Editor
                    label={stringData.shortdetail}
                    id={`custom-textarea-control-${parentIndex}`} // Ensure the ID is dynamic
                    value={file.sectioncontent} // Pass the content correctly
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: ['link', 'lists'],
                        toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link lists | removeformat | help',
                    }}
                    onEditorChange={(value) => updateItem(parentIndex, 'sectioncontent', value)}
                /> 
                <h3 className="margintop aad-a-e-e-bdbbc-1v57ksj">{stringData.Nested_rowr}</h3>
                {file.nestedItems.map((nestedItem, childIndex) => (
                    <div key={childIndex} className="nested-item mt-2">
                        <Editor
                            label={stringData.contactdetail}
                            id={`custom-textarea-control-${nestedItem.uniqueid}`}
                            value={nestedItem.title}
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
                            onEditorChange={(newTitle) => {
                                const newFiles = [...files];
                                newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
                                setAttributes({ files: newFiles });
                            }}
                        />
                        <MediaUpload
                            onSelect={(media) => onSelectFile(media, parentIndex, childIndex)}
                            type="file"
                            value={nestedItem.fileUrl}
                            render={({ open }) => (
                                <>
                                    <div className="buttons-wrapper d-flex mt-3">
                                    {nestedItem.fileUrl && <div class="list-icon"><img src={nestedItem.fileUrl} alt="icon" /></div>}
                                    </div>
                                    <Button onClick={open} className="button button-primary me-2 mt-3">
                                        {stringData.select_icon}
                                    </Button>
                                    <div className="buttons-wrapper d-flex mt-3">
                                        {nestedItem.fileUrl && (
                                            <Button className="button button-danger me-2" onClick={() => removeImage(parentIndex, childIndex)}>
                                            {stringData.delete_image}
                                            </Button>
                                        )}
                                    
                                        <Button className="button button-danger me-2" onClick={() => removeFile(parentIndex, childIndex)}>
                                            {stringData.delete_point}
                                        </Button>
                                    </div>
                                </>
                            )}
                        />
                    </div>
                ))}
                <div className="mt-2">
                    <Button onClick={() => addFile(parentIndex)} className="button button-primary">
                    {stringData.point}
                    </Button>
                </div>
              
               <TextControl
                
                    label= {stringData.mapshortcode}
                    value={file.shortcode}
                    onChange={(newContent) => {
                    const newFiles = [...files];
                    newFiles[parentIndex].shortcode = newContent;
                    setAttributes({ files: newFiles });
                    }}
                />
            </div>
            
          ))}
        
        </PanelBody>
      </InspectorControls>
        {files.map((file, parentIndex) => (
            <>
                {file.sectiontitle && (
                    (file.selectheading ? <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                    {file.selectheading && React.createElement(file.selectheading, { className: file.sectiontitle }, file.sectiontitle)}
                    </div> : 
                    <div className={"web-heading" + (file.upcomingchecbox ? " heading-divider" : "")}>
                      <h1> {file.sectiontitle}</h1>
                    </div> )
                )}
                <div class="contact-detail">
                    {file.sectioncontent ? ( <RichText.Content tagName="p" value={file.sectioncontent} /> ) : null}
                    <ul>
                       {file.nestedItems.map((nestedItem) => (
                            <li>
                                {nestedItem.fileUrl && (<img src={nestedItem.fileUrl} alt={nestedItem.imgalt} />)}
                                <div class="content">
                                  {nestedItem.title ? (<RichText.Content tagName="p" value={nestedItem.title} /> ) : null}
                                </div>
                                
                            </li>
                        ))}
                   </ul>
                </div>
               {file.shortcode && <div class="map-sec">{file.shortcode}</div>}
           </>    
        ))}
    </div>    
    </>
  );
}
