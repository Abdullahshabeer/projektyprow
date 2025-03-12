import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

const stringData = myBlockData.strings;
const right = myBlockData.right;
const file_icon = myBlockData.file_icon;

registerBlockType('kzrpnamespace/documents', {
    title: stringData.document,
    icon: 'admin-links',
    category: 'my-custom-category',
    attributes: {
        counttitle: {
            type: 'string',
            default: 'liczba dokumentów na stronie:',
        },
        files: {
            type: 'array',
            default: [],
        },
    },
    edit: CustomBlockEdit,
    save: function ({ attributes }) {
        const { files } = attributes;

        return (
            <div className="tab-block">
                <div className="tab-wrap">
                    <div className="tab-nav-sec">
                        <ul className="nav nav-pills justify-content-center" role="tablist">
                            {files.map((file, parentIndex) => (
                                <li key={parentIndex}>
                                    <button
                                        className={`nav-link ${parentIndex === 0 ? 'active' : ''}`}
                                        id={`nav-id-${file.uniqueid}`}
                                        data-bs-toggle="tab"
                                        data-bs-target={`#nav-${file.uniqueid}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`nav-${file.uniqueid}`}
                                        aria-selected="true"
                                        aria-label={`${file.sectiontitle} ${stringData.button_content}`}
                                    >
                                        {file.sectiontitle}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tab-content">
                        {files.map((file, parentIndex) => (
                            <div
                                className={`tab-pane fade ${parentIndex === 0 ? 'show active' : ''}`}
                                id={`nav-${file.uniqueid}`}
                                role="tabpanel"
                                aria-labelledby={`nav-id-${file.uniqueid}`}
                                tabIndex="0"
                                key={parentIndex}
                            >
                                <div className="block-link">
                                  <div class="total-post-count text-end mt-4 mb-3">
                                        <span>{attributes.counttitle}</span>
                                        {/* Dynamically update the total count of nested items */}
                                        <span className="number-of-posts"> {file.nestedItems.length} </span>
                                    </div>
                                    {file.nestedItems.map((nestedItem, childIndex) => (
                                        <div className="block-link-row" key={childIndex}>
                                           <a
                                            href={nestedItem.linkurl}
                                            className="d-flex"
                                            rel="noopener noreferrer"
                                            target={nestedItem.linkurl.endsWith('.pdf') ? "_blank" : ""}
                                            // rel={nestedItem.linkurl.endsWith('.pdf') ? "noopener noreferrer" : ""}
                                            download={nestedItem.linkurl.endsWith('.doc') || nestedItem.linkurl.endsWith('.docx') ? "" : undefined}
                                            >
                                                <div className="block-link-inner d-flex align-items-center">
                                                    {nestedItem.fileUrl &&
                                                        <div className="icon" id={`svg-container-${file.uniqueid + childIndex}`}>
                                                            <img className="svg" src={nestedItem.fileUrl} alt="icon" />
                                                        </div>
                                                  }
                                                    <div className="link-content d-flex align-items-center justify-content-between">
                                                        <div className="content">
                                                            <p>{nestedItem.title} {nestedItem.filesize && <span> [{nestedItem.filesize}, {nestedItem.fileextension}] </span>}</p>
                                                        </div>
                                                        <div className="right-icon">
                                                            <img src={right} alt="icon" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
});

function CustomBlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { files } = attributes;
    const instanceId = useInstanceId(CustomBlockEdit);
    const updateHttpToHttps = (url) => {
        return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
    };
    const onSelectFile = (media, parentIndex, childIndex) => {
        console.log(media, parentIndex, childIndex);
        if (media && media.url) {
            const newFiles = [...files];

        if (media && media.url && media.url.endsWith('.svg')) {
                
                        newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
                        setAttributes({ files: newFiles });       
            } else {
                alert('Please select an SVG file.');
            }
        }
    };
   
    const addFile = (parentIndex) => {
        const newFiles = [...files];
        newFiles[parentIndex].nestedItems.push({
            title: '1_Opis_Systemu_KZR_INiG_Zasady_ogolne',
            fileUrl: file_icon,
            linkurl: '#',
            filesize: '',
            fileextension: '',
            svgContent: '<svg width="54" height="69" viewBox="0 0 54 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.1761 2H16.3037C9.58112 2 6.21984 2 4.1314 4.11744C2.04297 6.23488 2.04297 9.64285 2.04297 16.4588V52.6058C2.04297 59.4217 2.04297 62.8297 4.1314 64.9471C6.21984 67.0646 9.58112 67.0646 16.3037 67.0646H37.6948C44.4173 67.0646 47.7786 67.0646 49.8671 64.9471C51.9555 62.8297 51.9555 59.4217 51.9555 52.6058V23.068C51.9555 21.5905 51.9555 20.8517 51.6841 20.1875C51.4127 19.5232 50.8975 19.0008 49.8671 17.956L36.218 4.11744C35.1876 3.07268 34.6724 2.5503 34.0172 2.27515C33.362 2 32.6334 2 31.1761 2Z" fill="white" stroke="#2F3E45" stroke-width="3"/><path class="hover-effect" d="M19.082 35.3334L38.8081 35.3334" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path class="hover-effect" d="M19.082 48.6667L32.2327 48.6667" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path d="M32.2344 2V15.3333C32.2344 18.476 32.2344 20.0474 33.1973 21.0237C34.1602 22 35.7101 22 38.8097 22H51.9604" stroke="#2F3E45" stroke-width="3"/></svg>',
        });
        setAttributes({ files: newFiles });
    };

    const removeFile = (parentIndex, childIndex) => {
        const newFiles = [...files];
        newFiles[parentIndex].nestedItems.splice(childIndex, 1);
        setAttributes({ files: newFiles });
    };

    const addSection = () => {
        const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
        setAttributes({
            files: [
                ...files,
                {
                    sectiontitle: 'New Section',
                    nestedItems: [],
                    uniqueid: newUniqueId,
                },
            ],
        });
    };
    const removeSection = (parentIndex) => {
        const newFiles = [...files];
        newFiles.splice(parentIndex, 1);
        setAttributes({ files: newFiles });
    };
    useEffect(() => {
        const newFiles = [...files];
    
        // Use a flag to check if there's any actual change in the files before calling setAttributes
        let hasChanged = false;
    
        newFiles.forEach(file => {
            file.nestedItems.forEach(item => {
                const updatedLink = updateHttpToHttps(item.linkurl);
                if (item.linkurl !== updatedLink) {
                    item.linkurl = updatedLink;
                    hasChanged = true;
                }
            });
        });
    
        // Only call setAttributes if files have been modified
        if (hasChanged) {
            setAttributes({ files: newFiles });
        }
    }, [files]);
    (parentIndex) => {
        const newFiles = [...files];
        newFiles.splice(parentIndex, 1);
        setAttributes({ files: newFiles });
    };
    
    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        const newFiles = [...files];
        const sourceItems = newFiles[parseInt(source.droppableId)].nestedItems;
        const destinationItems = newFiles[parseInt(destination.droppableId)].nestedItems;
    
        const [movedItem] = sourceItems.splice(source.index, 1); // Remove the dragged item
        destinationItems.splice(destination.index, 0, movedItem); // Insert it at the new position
    
        setAttributes({ files: newFiles });
    };
    
    
    return (
        <>
            <InspectorControls>
                <PanelBody title={stringData.Accordion_File_Block}>
                <TextControl
                    label="count title"
                    value={attributes.counttitle}
                    onChange={(newTitle) => setAttributes({ counttitle: newTitle })}
                />
                    {files.map((file, parentIndex) => (
                        <div key={parentIndex} className="mt-2">
                            <h3 className="margintop bold">{stringData.tab} {parentIndex + 1}</h3>
                            <TextControl
                                label={stringData.tab_title}
                                placeholder={stringData.Enter_a_title}
                                value={file.sectiontitle}
                                onChange={(value) => {
                                    const newFiles = [...files];
                                    newFiles[parentIndex].sectiontitle = value;
                                    setAttributes({ files: newFiles });
                                }}
                            />
                            {file.nestedItems.map((nestedItem, childIndex) => (
                                <div key={childIndex} className="nested-item mt-2">
                                    <h3 className="margintop bold">{stringData.tab} {parentIndex + 1} {stringData.linknumber} {childIndex + 1}</h3>
                                    <TextControl
                                        label={stringData.tab_inner_link_title}
                                        placeholder={stringData.Enter_a_title}
                                        value={nestedItem.title}
                                        onChange={(value) => {
                                            const newFiles = [...files];
                                            newFiles[parentIndex].nestedItems[childIndex].title = value;
                                            setAttributes({ files: newFiles });
                                        }}
                                    />
                                    <label>{stringData.tab_inner_link_icon}</label>
                                    
                                        <img src={nestedItem.fileUrl} alt="icon" />
                                    <MediaUpload
                                        onSelect={(media) => onSelectFile(media, parentIndex, childIndex)}
                                        type="file"
                                        value={nestedItem.fileUrl}
                                        render={({ open }) => (
                                            <Button onClick={open} className="button button-primary me-2">
                                                {nestedItem.fileUrl ? stringData.change_icon : stringData.add_icon}
                                            </Button>
                                        )}
                                    />
                                    <TextControl
                                        label={stringData.tab_inner_link_url}
                                        placeholder={stringData.Enter_a_title}
                                        value={nestedItem.linkurl}
                                        onChange={(value) => {
                                            const newFiles = [...files];
                                            newFiles[parentIndex].nestedItems[childIndex].linkurl = value;
                                            setAttributes({ files: newFiles });
                                        }}
                                       
                                    />
                                      <div className="blockbutton">
                                            <MediaUpload
                                                onSelect={(media) => {
                                                    const newFiles = [...files];
                                                    const url = media.url;
                                                    const filesize = media.filesizeHumanReadable; // Get filesize if available
                                                    const fileExtension = url.split('.').pop();
                                                    newFiles[parentIndex].nestedItems[childIndex].filesize = filesize;
                                                    newFiles[parentIndex].nestedItems[childIndex].fileextension = fileExtension;
                                                    newFiles[parentIndex].nestedItems[childIndex].linkurl = url;
                                                    setAttributes({ files: newFiles });
                                                }}
                                                type="file"
                                                value={nestedItem.linkurl}
                                                render={({ open }) => (
                                                    <Button onClick={open} className="button button-primary me-2">
                                                        {nestedItem.linkurl ? stringData.choose_file : stringData.choose_file}
                                                    </Button>
                                                )}
                                            />
                                        </div>
                                    
                                    <Button
                                        className="button button-danger"
                                        onClick={() => removeFile(parentIndex, childIndex)}
                                    >
                                        {stringData.remove_link}
                                    </Button>
                                </div>
                            ))}
                            <div className="mt-2">
                                <Button onClick={() => addFile(parentIndex)} className="button button-primary">
                                    {stringData.add_link}
                                </Button>
                            </div>
                            <div className="mt-2">
                                <Button className="button button-danger" onClick={() => removeSection(parentIndex)}>
                                    {stringData.remove_teb}
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <Button onClick={addSection} className="button button-primary">
                            {stringData.add_new_teb}
                        </Button>
                    </div>
                </PanelBody>
            </InspectorControls>
            <div class="tab-block">
                <div class="tab-wrap">
                    <div class="tab-nav-sec">
                        <ul class="nav nav-pills justify-content-center" role="tablist">
                            {files.map((file, parentIndex) => (
                                <li key={parentIndex}>
                                    <button
                                        class={`nav-link ${parentIndex === 0 ? 'active' : ''}`}
                                        id={`nav-id-${file.uniqueid}`}
                                        data-bs-toggle="tab"
                                        data-bs-target={`#nav-${file.uniqueid}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`nav-${file.uniqueid}`}
                                        aria-selected="true"
                                        aria-label={`${file.sectiontitle} ${stringData.button_content}`}
                                    >
                                        {file.sectiontitle}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div class="tab-content">
                        {files.map((file, parentIndex) => (
                            <div
                                class={`tab-pane fade ${parentIndex === 0 ? 'show active' : ''}`}
                                id={`nav-${file.uniqueid}`}
                                role="tabpanel"
                                aria-labelledby={`nav-id-${file.uniqueid}`}
                                tabindex="0"
                                key={parentIndex}
                            >
                                <div className="block-link">
                                       <div class="total-post-count text-end mt-4 mb-3">
                                            <span> {attributes.counttitle}</span>
                                            {/* Dynamically update the total count of nested items */}
                                            <span className="number-of-posts"> {file.nestedItems.length} </span>
                                        </div>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                        <Droppable droppableId={parentIndex.toString()} direction="vertical">
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                    {file.nestedItems.map((nestedItem, childIndex) => (
                                                        <Draggable
                                                            key={`nested-${parentIndex}-${childIndex}`}
                                                            draggableId={`nested-${parentIndex}-${childIndex}`}
                                                            index={childIndex}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="nested-item mt-2"
                                                                >
                                                                    <div class="block-link-row">
                                                                        <a href='#' class="d-flex">
                                                                            <div class="block-link-inner d-flex align-items-center">
                                                                                {nestedItem.fileUrl && (
                                                                                    <div className="icon">
                                                                                        <img className="svg" src={nestedItem.fileUrl} alt="icon" />
                                                                                    </div>
                                                                                )}
                                                                                <div class="link-content d-flex align-items-center justify-content-between">
                                                                                    <div class="content">
                                                                                        <p>
                                                                                            {nestedItem.title}{' '}
                                                                                            {nestedItem.filesize && (
                                                                                                <span>
                                                                                                    {' '}
                                                                                                    [{nestedItem.filesize},{' '}
                                                                                                    {nestedItem.fileextension}]
                                                                                                </span>
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div class="right-icon">
                                                                                        <img src={right} alt="icon" aria-hidden="true" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}
