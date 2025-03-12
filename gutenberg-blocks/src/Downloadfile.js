const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, CheckboxControl } = wp.components;
const stringData = myBlockData.strings;

registerBlockType('makeupnamespace/download-file-block', {
  title: stringData.download_file_block,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: [],
    },
  },
  edit: CustomBlockEdit,
  save: function ({ attributes }) {
    const { files } = attributes;
    return (
      <div class="block-link">
          {files.map((file, index) => (
            <div class="block-link-row" key={index}>
                 <a href={file.fileUrl} class="d-flex align-items-center" download>
                     <div class="block-link-inner d-flex align-items-center">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                            <path d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20" stroke="url(#paint0_linear_405_15583)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                            <linearGradient id="paint0_linear_405_15583" x1="10" y1="20" x2="10" y2="2" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#7E115E"/>
                            <stop offset="1" stop-color="#7E115E" stop-opacity="0.9"/>
                            </linearGradient>
                            </defs>
                            </svg>
                        </div>  
                     
                        <div class="link-content">
                        <p>{file.title} {file.upcomingchecbox ? `[${file.fileName}, ${file.fileSize}]` : ''}</p>
                        </div>
                      </div>    
                 </a>
           </div>
            ))}
        
      </div>
    );
  },
});

const { useState } = wp.element;

function CustomBlockEdit(props) {
  const { attributes, setAttributes } = props;
  const { files } = attributes;

  if (props.attributes.files.length === 0) {
    props.setAttributes({
        files: [
          ...files,
          { title: 'TYTUŁ', fileUrl: '', fileName: '', fileSize: 0, upcomingchecbox: false }
        ],
      });
  }

  const onSelectFile = (media, index) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[index].fileUrl = media.url;
      newFiles[index].fileSize = media.filesizeHumanReadable;
      newFiles[index].filetitle = media.filename;
  
      // Extract the file extension from the filename (get the last part after the last dot)
      const fileExtension = media.filename.split('.').pop();
      newFiles[index].fileName = fileExtension;
  
      setAttributes({ files: newFiles });
    }
  };

  const addFile = () => {
    setAttributes({
      files: [...files, { title: 'TYTUŁ', fileUrl: '', fileName: '', filetitle:'' , fileSize: 0, upcomingchecbox: false }],
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setAttributes({ files: newFiles });
  };

  return (
    <div class="block-link">
      <InspectorControls>
        <PanelBody title={stringData.File_Block_Settings}>
          {files.map((file, index) => (
            <div key={index} className="mt-2">
              <h3>{stringData.Title}</h3>
              <input
                type="text"
                value={file.title}
                className="form-control"
                onChange={(e) => {
                  const newFiles = [...files];
                  newFiles[index].title = e.target.value;
                  setAttributes({ files: newFiles });
                }}
              />
              <h2 className="margin-top"> </h2>
              {file.filetitle && stringData.filename}
              <h1 className="margin-top fs-5">{file.filetitle} </h1>
              <MediaUpload
                onSelect={(media) => onSelectFile(media, index)}
                type="file"
                value={file.fileUrl}
                render={({ open }) => (
                  <>
                    <div className="buttons-wrapper d-flex mt-3">
                        <Button onClick={open} className="button button-primary me-2">
                        {file.fileUrl ? stringData.Change_file : stringData.choose_a_file}
                        </Button>
                        <Button className="button button-danger" onClick={() => removeFile(index)}>{stringData.delete_file}</Button>
                    </div>
                  </>
                )}
              />
              <CheckboxControl
                  label='show file size'
                  className='mt-4'
                  checked={file.upcomingchecbox}
                  onChange={(isChecked) => {
                      const newFiles = [...files];
                      newFiles[index].upcomingchecbox = isChecked;
                      setAttributes({ files: newFiles });
                  }}
              />
            </div>
          ))}
          <div className="mt-4">
            <Button onClick={addFile} className="button button-primary">{stringData.file_new_file}</Button>
          </div>
        </PanelBody>
      </InspectorControls>
      
      {files.map((file, index) => (
            <div class="block-link-row" key={index}>
                <div class="block-link-inner d-flex align-items-center">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                            <path d="M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20" stroke="url(#paint0_linear_405_15583)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <defs>
                                <linearGradient id="paint0_linear_405_15583" x1="10" y1="20" x2="10" y2="2" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#7E115E"/>
                                    <stop offset="1" stop-color="#7E115E" stop-opacity="0.9"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>  
                    <div class="link-content">
                        <p>{file.title} {file.upcomingchecbox ? `[${file.fileName}, ${file.fileSize}]` : ''}</p>
                    </div>
                  </div>   
            </div>
      ))}
    </div>
  );
}
