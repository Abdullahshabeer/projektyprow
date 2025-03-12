/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Documents.js":
/*!**************************!*\
  !*** ./src/Documents.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls
} = wp.blockEditor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const {
  useInstanceId
} = wp.compose;
const stringData = myBlockData.strings;
const right = myBlockData.right;
const file_icon = myBlockData.file_icon;
registerBlockType('kzrpnamespace/documents', {
  title: stringData.document,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: []
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "tab-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "tab-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "tab-nav-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      class: "nav nav-pills justify-content-center",
      role: "tablist"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      class: `nav-link ${parentIndex === 0 ? 'active' : ''}`,
      id: `nav-id-${file.uniqueid}`,
      "data-bs-toggle": "tab",
      "data-bs-target": `#nav-${file.uniqueid}`,
      type: "button",
      role: "tab",
      "aria-controls": `nav-${file.uniqueid}`,
      "aria-selected": "true",
      "aria-label": `${file.sectiontitle} ${stringData.button_content}`
    }, file.sectiontitle))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "tab-content"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: `tab-pane fade ${parentIndex === 0 ? 'show active' : ''}`,
      id: `nav-${file.uniqueid}`,
      role: "tabpanel",
      "aria-labelledby": `nav-id-${file.uniqueid}`,
      tabindex: "0"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link"
    }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-row",
      key: childIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "#",
      class: "d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-inner d-flex align-items-center"
    }, nestedItem.fileUrl.endsWith('.svg') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon",
      id: `svg-container-${file.uniqueid + childIndex}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: "svg",
      src: nestedItem.fileUrl,
      alt: "icon"
    })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "link-content d-flex align-items-center justify-content-between"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, nestedItem.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon"
    })))))))))))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const instanceId = useInstanceId(CustomBlockEdit);
  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      if (media.url.endsWith('.svg')) {
        // Fetch the SVG content
        fetch(media.url).then(response => response.text()).then(svgContent => {
          newFiles[parentIndex].nestedItems[childIndex].svgContent = svgContent;
          newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url; // Store the SVG URL
          setAttributes({
            files: newFiles
          });
        });
      } else {
        newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
        newFiles[parentIndex].nestedItems[childIndex].svgContent = null; // Clear SVG content if it's not SVG
        setAttributes({
          files: newFiles
        });
      }
    }
  };
  const addFile = parentIndex => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.push({
      title: '1_Opis_Systemu_KZR_INiG_Zasady_ogolne',
      fileUrl: file_icon,
      linkurl: '#',
      svgContent: '<svg width="54" height="69" viewBox="0 0 54 69" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.1761 2H16.3037C9.58112 2 6.21984 2 4.1314 4.11744C2.04297 6.23488 2.04297 9.64285 2.04297 16.4588V52.6058C2.04297 59.4217 2.04297 62.8297 4.1314 64.9471C6.21984 67.0646 9.58112 67.0646 16.3037 67.0646H37.6948C44.4173 67.0646 47.7786 67.0646 49.8671 64.9471C51.9555 62.8297 51.9555 59.4217 51.9555 52.6058V23.068C51.9555 21.5905 51.9555 20.8517 51.6841 20.1875C51.4127 19.5232 50.8975 19.0008 49.8671 17.956L36.218 4.11744C35.1876 3.07268 34.6724 2.5503 34.0172 2.27515C33.362 2 32.6334 2 31.1761 2Z" fill="white" stroke="#2F3E45" stroke-width="3"/><path class="hover-effect" d="M19.082 35.3334L38.8081 35.3334" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path class="hover-effect" d="M19.082 48.6667L32.2327 48.6667" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path d="M32.2344 2V15.3333C32.2344 18.476 32.2344 20.0474 33.1973 21.0237C34.1602 22 35.7101 22 38.8097 22H51.9604" stroke="#2F3E45" stroke-width="3"/></svg>'
    });
    setAttributes({
      files: newFiles
    });
  };
  const removeFile = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems.splice(childIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [...files, {
        sectiontitle: 'New Section',
        nestedItems: [],
        uniqueid: newUniqueId
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Accordion_File_Block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop bold"
  }, stringData.tab, " ", parentIndex + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.tab_title,
    placeholder: stringData.Enter_a_title,
    value: file.sectiontitle,
    onChange: value => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = value;
      setAttributes({
        files: newFiles
      });
    }
  }), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop bold"
  }, stringData.tab, " ", parentIndex + 1, " ", stringData.linknumber, " ", childIndex + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.tab_inner_link_title,
    placeholder: stringData.Enter_a_title,
    value: nestedItem.title,
    onChange: value => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, stringData.tab_inner_link_icon), nestedItem.fileUrl.endsWith('.svg') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icn",
    id: `svg-preview-${file.uniqueid + childIndex}`,
    dangerouslySetInnerHTML: {
      __html: nestedItem.svgContent
    }
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: nestedItem.fileUrl,
    alt: "icon"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, nestedItem.fileUrl ? stringData.change_icon : stringData.add_icon)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.tab_inner_link_url,
    placeholder: stringData.Enter_a_title,
    value: nestedItem.linkurl,
    onChange: value => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].linkurl = value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blockbutton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].linkurl = media.url;
      setAttributes({
        files: newFiles
      });
    },
    type: "file",
    value: nestedItem.linkurl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, nestedItem.linkurl ? stringData.choose_file : stringData.choose_file)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeFile(parentIndex, childIndex)
  }, stringData.remove_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.add_link)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.remove_teb)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_new_teb)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "tab-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "tab-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "tab-nav-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    class: "nav nav-pills justify-content-center",
    role: "tablist"
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: parentIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    class: `nav-link ${parentIndex === 0 ? 'active' : ''}`,
    id: `nav-id-${file.uniqueid}`,
    "data-bs-toggle": "tab",
    "data-bs-target": `#nav-${file.uniqueid}`,
    type: "button",
    role: "tab",
    "aria-controls": `nav-${file.uniqueid}`,
    "aria-selected": "true",
    "aria-label": `${file.sectiontitle} ${stringData.button_content}`
  }, file.sectiontitle))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "tab-content"
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: `tab-pane fade ${parentIndex === 0 ? 'show active' : ''}`,
    id: `nav-${file.uniqueid}`,
    role: "tabpanel",
    "aria-labelledby": `nav-id-${file.uniqueid}`,
    tabindex: "0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link"
  }, file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-row",
    key: childIndex
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    class: "d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-inner d-flex align-items-center"
  }, nestedItem.fileUrl.endsWith('.svg') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon",
    id: `svg-container-${file.uniqueid + childIndex}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    class: "svg",
    src: nestedItem.fileUrl,
    alt: "icon"
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: nestedItem.fileUrl,
    alt: "icon"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "link-content d-flex align-items-center justify-content-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, nestedItem.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "right-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon",
    "aria-hidden": "true"
  }))))))))))))));
}

/***/ }),

/***/ "./src/Infographic.js":
/*!****************************!*\
  !*** ./src/Infographic.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('kzrnamespace/graphic', {
  title: stringData.Infographi,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'KROK 1 Spełnienie wymagań Systemu',
        progressbar: '20',
        backgroundcolor: 'linear-gradient(180deg, #3A494E 0%, #60583F 100%)',
        discription: 'Aby zostać Uczestnikiem Systemu KZR INiG i uzyskać Certyfikat KZR INiG należy zapoznać się z Dokumentami Systemowymi (link), i w zależności od działalności przedsiębiorstwa oraz miejsca w łańcuchu dostaw, wdrożyć odpowiedni system zarządzania spełniając wymagania Systemu KZR INiG.'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle,
      Titlecontent,
      mapshortcode,
      mainTitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "stages-card-block"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "stage-card-row light-bg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "card-img",
      role: "progressbar",
      style: {
        '--value': item.progressbar,
        '--background': item.backgroundcolor
      }
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-color",
      style: {
        background: item.backgroundcolor
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.discription
      }
    }))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  if (props.attributes.slideritems.length === 0) {
    props.setAttributes({
      slideritems: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'KROK 1 Spełnienie wymagań Systemu',
        progressbar: '20',
        backgroundcolor: 'linear-gradient(180deg, #3A494E 0%, #60583F 100%)',
        discription: 'Aby zostać Uczestnikiem Systemu KZR INiG i uzyskać Certyfikat KZR INiG należy zapoznać się z Dokumentami Systemowymi (link), i w zależności od działalności przedsiębiorstwa oraz miejsca w łańcuchu dostaw, wdrożyć odpowiedni system zarządzania spełniając wymagania Systemu KZR INiG.'
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: 'KROK 1 Spełnienie wymagań Systemu',
      progressbar: '20',
      backgroundcolor: 'linear-gradient(180deg, #3A494E 0%, #60583F 100%)',
      discription: 'Aby zostać Uczestnikiem Systemu KZR INiG i uzyskać Certyfikat KZR INiG należy zapoznać się z Dokumentami Systemowymi (link), i w zależności od działalności przedsiębiorstwa oraz miejsca w łańcuchu dostaw, wdrożyć odpowiedni system zarządzania spełniając wymagania Systemu KZR INiG.'
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Infographic, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.Infographic_Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Infographic_title,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.Infographic_discription,
    placeholder: stringData.Enter_a_title,
    value: item.discription,
    onChange: value => updateSliderItem(index, 'discription', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.progressbar,
    placeholder: stringData.Enter_a_title,
    value: item.progressbar,
    onChange: value => updateSliderItem(index, 'progressbar', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.backgroundcolor,
    placeholder: stringData.Enter_a_title,
    value: item.backgroundcolor,
    onChange: value => updateSliderItem(index, 'backgroundcolor', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.Infographic_remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.Infographic_add))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "stages-card-block"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "stage-card-row light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-img",
    role: "progressbar",
    style: {
      '--value': item.progressbar,
      '--background': item.backgroundcolor
    }
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "card-color",
    style: {
      background: item.backgroundcolor
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.discription
    }
  }))))));
}

/***/ }),

/***/ "./src/ShortcodeContentPreview.js":
/*!****************************************!*\
  !*** ./src/ShortcodeContentPreview.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


function ShortcodeContentPreview({
  attributes,
  apiCallback
}) {
  const {
    postType,
    postsPerPage,
    categoryID,
    selectedCategory,
    displayFilters,
    postperpage,
    upcomingchecbox,
    categories
  } = attributes;
  const [content, setContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  //  console.log(attributes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Make an AJAX request to fetch the content generated by the shortcode
    const fetchContent = async () => {
      try {
        const response = await fetch(apiCallback, {
          method: 'POST',
          // Use the appropriate HTTP method
          body: JSON.stringify({
            postType,
            // Use postType from attributes
            postsPerPage,
            // Use postsPerPage from attributes
            upcomingchecbox,
            // Use upcomingchecbox from attributes
            categories,
            categoryID,
            selectedCategory,
            displayFilters,
            postperpage
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error(error);
        setContent('Failed to fetch content');
      }
    };
    fetchContent();
  }, [upcomingchecbox, categories, postType, postsPerPage, categoryID, displayFilters, postperpage, selectedCategory]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "shortcode-content-preview"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
}
/* harmony default export */ __webpack_exports__["default"] = (ShortcodeContentPreview);

/***/ }),

/***/ "./src/add-title-block.js":
/*!********************************!*\
  !*** ./src/add-title-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  InspectorControls
} = wp.editor;
const stringData = myBlockData.strings;
wp.blocks.registerBlockType('kzrnamespace/heading-bloc', {
  title: stringData.Section_headin,
  icon: 'heading',
  category: 'my-custom-category',
  attributes: {
    sectionTitle: {
      type: 'string',
      default: stringData.enter_headingg
    },
    headings: {
      type: 'string',
      default: ''
    },
    selectheading: {
      type: 'string',
      default: 'h1'
    },
    upcomingchecbox: {
      type: 'boolean',
      default: false
    },
    content: {
      type: 'string',
      default: ''
    }
  },
  edit: HeadingBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      headingText,
      selectheading,
      sectionTitle,
      upcomingchecbox,
      content
    } = attributes;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (upcomingchecbox ? " heading-divider" : "")
    }, headingTag !== '' && React.createElement(headingTag, {
      className: sectionTitle
    }, sectionTitle)));
  }
});
function HeadingBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    headingText,
    selectheading,
    sectionTitle,
    upcomingchecbox,
    content
  } = attributes;
  const headingTag = selectheading || 'h1';
  function updateHeadingText(newText) {
    setAttributes({
      headingText: newText
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: selectheading,
    options: [{
      value: '',
      label: stringData.heading_style
    }, {
      value: 'h1',
      label: stringData.Heading + '1'
    }, {
      value: 'h2',
      label: stringData.Heading + '2'
    }, {
      value: 'h3',
      label: stringData.Heading + '3'
    }, {
      value: 'h4',
      label: stringData.Heading + '4'
    }, {
      value: 'h5',
      label: stringData.Heading + '5'
    }, {
      value: 'h6',
      label: stringData.Heading + '6'
    }],
    onChange: newStyle => setAttributes({
      selectheading: newStyle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiontt,
    value: sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (upcomingchecbox ? " heading-divider" : "")
  }, headingTag !== '' && React.createElement(headingTag, {
    className: sectionTitle
  }, sectionTitle)));
}

/***/ }),

/***/ "./src/api-table-block.js":
/*!********************************!*\
  !*** ./src/api-table-block.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  TextControl
} = wp.components;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;
registerBlockType('kzr-namespace/api-table', {
  title: stringData.api_table || 'API Table',
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    token: {
      type: 'string',
      default: '20F14E67A39AC9106893'
    }
  },
  edit: ({
    attributes,
    setAttributes
  }) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
      label: stringData.apitoken || 'API Token',
      value: attributes.token,
      onChange: newToken => setAttributes({
        token: newToken
      })
    }));
  },
  save() {
    return null; // Dynamic block, rendered by PHP
  }
});

/***/ }),

/***/ "./src/certification.js":
/*!******************************!*\
  !*** ./src/certification.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  InnerBlocks,
  RichText
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const right = myBlockData.right;
const urlimage = myBlockData.defaultimge;

registerBlockType('kzrnamespace/certification-block', {
  title: stringData.certification,
  icon: 'admin-links',
  category: 'my-custom-category',
  attributes: {
    files: {
      type: 'array',
      default: []
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion-block style-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion",
      id: "accordion-block"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion-item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button  ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-id-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-id-${file.uniqueid}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, file.sectiontitle), file.logourl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "image"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: file.logourl,
      alt: file.logoalt || "Image",
      "aria-hidden": "true"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-id-${file.uniqueid}`,
      className: `accordion-collapse collapse ${parentIndex === 0 ? 'show' : ''} `,
      "data-bs-parent": "#accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion-body"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      tagName: "p",
      value: file.sectioncontent
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link style-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: file.Thumbnail_link,
      className: "d-flex"
    }, file.Thumbnailurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: file.Thumbnailurl,
      alt: file.Thumbnailalt || "Image",
      "aria-hidden": "true"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-link-inner d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "link-content d-flex align-items-center justify-content-between"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "content"
    }, file.Thumbnail_title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, file.Thumbnail_title), file.Thumbnail_secondtitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.Thumbnail_secondtitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon",
      "aria-hidden": "true"
    })))))))))))))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(CustomBlockEdit);
  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [...files, {
        sectiontitle: 'Baltic Control Certification A/S, Brunbjergvej 3, 1, 8240 Risskov',
        logourl: '',
        logoalt: '',
        sectioncontent: '',
        Thumbnailurl: urlimage,
        Thumbnailalt: '',
        Thumbnail_title: 'Certyfikat',
        Thumbnail_secondtitle: 'Bureau Veritas Polska Sp. z o. o.',
        Thumbnail_link: '',
        uniqueid: newUniqueId
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  const updateItem = (index, key, value) => {
    const newFiles = [...files];
    newFiles[index][key] = value;
    setAttributes({
      files: newFiles
    });
  };
  const openMediaLibrary = index => {
    const mediaLibrary = wp.media({
      title: stringData.Select_an_image,
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        updateItem(index, 'logourl', media.url);
        updateItem(index, 'logoalt', media.alt);
      }
    });
    mediaLibrary.open();
  };
  const openMediaLibraryThumbnail = index => {
    const mediaLibrary = wp.media({
      title: stringData.Select_an_image,
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        updateItem(index, 'Thumbnailurl', media.url);
        updateItem(index, 'Thumbnailalt', media.alt);
      }
    });
    mediaLibrary.open();
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Accordion_File_Block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.AccordionTitle,
    value: file.sectiontitle,
    onChange: value => {
      updateItem(parentIndex, 'sectiontitle', value);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.accordion_logo), file.logourl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: file.logourl,
    alt: file.logoalt || "Image",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => updateItem(parentIndex, 'logourl', ''),
    className: "button button-danger"
  }, stringData.Accordion_remove_remove)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => openMediaLibrary(parentIndex),
    className: "button button-secondary"
  }, stringData.Accordion_add_logo), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    tagName: "p",
    label: stringData.accordion_discription,
    value: file.sectioncontent,
    onChange: value => updateItem(parentIndex, 'sectioncontent', value) // Correct binding here
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.accordion_Thumbnail), file.Thumbnailurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: file.Thumbnailurl,
    alt: file.Thumbnailalt || "Image",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => updateItem(parentIndex, 'Thumbnailurl', ''),
    className: "button button-danger"
  }, stringData.remove_Thumbnail)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => openMediaLibraryThumbnail(parentIndex),
    className: "button button-secondary"
  }, stringData.add_Thumbnail), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Thumbnail_Title,
    value: file.Thumbnail_title,
    onChange: value => {
      updateItem(parentIndex, 'Thumbnail_title', value);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Thumbnail_second_Title,
    value: file.Thumbnail_secondtitle,
    onChange: value => {
      updateItem(parentIndex, 'Thumbnail_secondtitle', value);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Thumbnail_Link,
    value: file.Thumbnail_link,
    onChange: value => {
      updateItem(parentIndex, 'Thumbnail_link', value);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.remove_accordion_sectiont)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_accordion_sectiont)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion-block style-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion",
    id: "accordion-block"
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion-item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `accordion-button  ${parentIndex === 0 ? '' : 'collapsed'}`,
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": `#collapse-id-${file.uniqueid}`,
    "aria-expanded": "true",
    "aria-controls": `collapse-id-${file.uniqueid}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, file.sectiontitle), file.logourl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: file.logourl,
    alt: file.logoalt || "Image",
    "aria-hidden": "true"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: `collapse-id-${file.uniqueid}`,
    className: `accordion-collapse collapse ${parentIndex === 0 ? 'show' : ''} `,
    "data-bs-parent": "#accordion-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: file.sectioncontent
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link style-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: file.Thumbnail_link,
    className: "d-flex"
  }, file.Thumbnailurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: file.Thumbnailurl,
    alt: file.Thumbnailalt || "Image",
    "aria-hidden": "true"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-link-inner d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "link-content d-flex align-items-center justify-content-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content"
  }, file.Thumbnail_title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, file.Thumbnail_title), file.Thumbnail_secondtitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.Thumbnail_secondtitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "right-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon",
    "aria-hidden": "true"
  })))))))))))))));
}

/***/ }),

/***/ "./src/different_post-design.js":
/*!**************************************!*\
  !*** ./src/different_post-design.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;
const right = myBlockData.right;

registerBlockType('kzrnamespace/differentdesign', {
  title: stringData.differentdesign_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postsectiontitle: {
      type: 'string',
      default: 'Aktualności'
    },
    postperpage: {
      type: 'number',
      // Set the type to 'number'
      default: 3 // Default value for the number of posts per page
    },

    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    buttontitle: {
      type: 'string',
      default: 'Wszystkie aktualności'
    },
    upcomingchecbox: {
      type: 'boolen',
      default: false
    },
    buttonlink: {
      type: 'string',
      default: '#'
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      postsectiontitle,
      buttontitle,
      buttonlink,
      postperpage,
      upcomingchecbox
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), "[szkolenia-shortcode post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" categories=\"", selectedCategory, "\"]", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "view-more"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex"
    }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: buttonlink,
      class: "link-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon"
    }))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postsectiontitle,
    buttontitle,
    buttonlink,
    postperpage,
    upcomingchecbox
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
    try {
      let response;
      if (taxonomyslug === 'category') {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/categories?per_page=100`);
      } else {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/${taxonomyslug}?per_page=100`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          setCategoryOptions([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get post type options
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
    try {
      const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.taxonomies) {
        const taxonomySlug = data.taxonomies[0];
        return taxonomySlug;
      }
      return '';
    } catch (error) {
      console.error('Error fetching taxonomy for post type:', error);
      return '';
    }
  };
  const handleChange = newPerPage => {
    // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
    const parsedPerPage = parseInt(newPerPage) || 0;
    setAttributes({
      postperpage: parsedPerPage
    });
  };
  // Initialize state when component mounts
  useEffect(() => {
    const initializeState = async () => {
      const options = getPostTypeOptions();
      setPostTypeOptions(options);
      if (postType && postType !== 'select') {
        const taxonomyslug = await getTaxonomySlugForPostType(postType);
        fetchCategories(taxonomyslug);
      }
    };
    initializeState();
  }, []);
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/szkolenia-post-shortcode-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_section_Title,
    placeholder: stringData.Enter_a_title,
    value: postsectiontitle,
    onChange: newTitle => setAttributes({
      postsectiontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: handleChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.BUtton_Title,
    placeholder: stringData.section_button,
    value: buttontitle,
    onChange: newTitle => setAttributes({
      buttontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_link,
    placeholder: stringData.Enter_a_title,
    value: buttonlink,
    onChange: newTitle => setAttributes({
      buttonlink: newTitle
    })
  })))), attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "view-more"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn d-flex"
  }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buttonlink,
    class: "link-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon"
  }))))));
}

/***/ }),

/***/ "./src/faq-toggle-block.js":
/*!*********************************!*\
  !*** ./src/faq-toggle-block.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;

registerBlockType('kzrnamespace/accordion-block', {
  title: stringData.accordion,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    sectiontitle: {
      type: 'string',
      default: 'FAQ'
    },
    files: {
      type: 'array',
      default: []
    }
  },
  edit: CustomBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      files
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion",
      id: "accordion-block"
    }, files.map((file, parentIndex) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "accordion-item",
        key: parentIndex
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        className: `accordion-button  ${parentIndex === 0 ? '' : 'collapsed'}`,
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#collapse-id-${file.uniqueid}`,
        "aria-expanded": "true",
        "aria-controls": `collapse-id-${file.uniqueid}`
      }, file.sectiontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        id: `collapse-id-${file.uniqueid}`,
        className: `accordion-collapse collapse ${parentIndex === 0 ? 'show' : ''} `,
        "data-bs-parent": "#accordion-block"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        class: "accordion-body"
      }, file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        dangerouslySetInnerHTML: {
          __html: file.sectioncontent
        }
      }))));
    }))));
  }
});
const {
  useState
} = wp.element;
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(CustomBlockEdit);
  const addSection = () => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    setAttributes({
      files: [...files, {
        sectiontitle: '1. Jaki jest czas uzyskania Certyfikatu w Systemie KZR INiG?',
        sectioncontent: 'Gospodarstwo rolne, nie objęte systemem płatności w ramach zasady wzajemnej zgodności, <b>może produkować biomasę <br>spełniająca KZR</b>, jeśli określone kryteria zrównoważonego rozwoju są spełnione (kryteria dotyczące gruntów). Jest to<br> weryfikowane podczas audytu.',
        uniqueid: newUniqueId
      }]
    });
  };
  const removeSection = parentIndex => {
    const newFiles = [...files];
    newFiles.splice(parentIndex, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Accordion_File_Block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.faq_section_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.faq_title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: stringData.fa_title,
    className: "form-control",
    value: file.sectiontitle,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectiontitle = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop"
  }, stringData.Enter_a_description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    placeholder: stringData.Enter_description,
    value: file.sectioncontent,
    className: "form-control",
    rows: 10 // Set the number of rows to 20
    ,
    onChange: e => {
      const newFiles = [...files];
      newFiles[parentIndex].sectioncontent = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-danger",
    onClick: () => removeSection(parentIndex)
  }, stringData.Delete_a_section)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addSection,
    className: "button button-primary"
  }, stringData.add_sectiont)))), attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "accordion",
    id: "accordion-block"
  }, files.map((file, parentIndex) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "accordion-item",
      key: parentIndex
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `accordion-button  ${parentIndex === 0 ? '' : 'collapsed'}`,
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse-id-${file.uniqueid}`,
      "aria-expanded": "true",
      "aria-controls": `collapse-id-${file.uniqueid}`
    }, file.sectiontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      id: `collapse-id-${file.uniqueid}`,
      className: `accordion-collapse collapse ${parentIndex === 0 ? 'show' : ''} `,
      "data-bs-parent": "#accordion-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "accordion-body"
    }, file.sectioncontent && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: file.sectioncontent
      }
    }))));
  }))));
}

/***/ }),

/***/ "./src/home-banner-block.js":
/*!**********************************!*\
  !*** ./src/home-banner-block.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
const iconurl = myBlockData.icon;
registerBlockType('kzrnamespace/homebanner', {
  title: stringData.list,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    sectionTitle: {
      type: 'string',
      default: 'KZR INiG'
    },
    bannerdiscription: {
      type: 'string',
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'
    },
    backgroundimage: {
      type: 'object',
      default: {
        imgurl: urlimage,
        imgealt: ''
      }
    },
    bannervideo: {
      type: 'object',
      default: {
        videourl: urlimage,
        imgealt: ''
      }
    },
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: iconurl,
        svgContent: '<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="hover-effect" d="M53.9829 44.0071V59.4071M46.5054 51.8688H61.3552" stroke="#2F3E45" stroke-width="3.29999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.0028 31.4688C43.3119 31.4688 49.2371 25.5435 49.2371 18.2344C49.2371 10.9252 43.3119 5 36.0028 5C28.6937 5 22.7686 10.9252 22.7686 18.2344C22.7686 25.5435 28.6937 31.4688 36.0028 31.4688Z" stroke="#2F3E45" stroke-width="3.29999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M43.1303 64.5547H9.53418V57.9375C9.53418 43.3193 21.3845 31.4688 36.0027 31.4688C41.0959 31.4688 45.8531 32.9073 49.8901 35.4002" stroke="#2F3E45" stroke-width="3.29999" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        imgealt: '',
        title: 'Rejestracja w systemie',
        link: ''
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle,
      bannerdiscription,
      backgroundimage,
      bannervideo
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      className: "home-main"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
      autoPlay: true,
      muted: true,
      loop: true,
      poster: attributes.backgroundimage.imgurl || 'images/home-bg.png'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
      src: attributes.bannervideo.videourl || 'videos/banner-video.mp4',
      type: "video/mp4"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "home-top-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading"
    }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      tagName: "p",
      value: attributes.bannerdiscription
    }))), slideritems.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "shortcuts-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, stringData.Na_skrty)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme shortcuts-carousel"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link
    }, item.imgeurl.endsWith('.svg') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: "svg",
      src: item.imgeurl,
      alt: item.imgealt || 'Image',
      "aria-hidden": "true"
    })), item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))))) : null)));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    sectionTitle,
    bannerdiscription,
    backgroundimage,
    bannervideo
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  if (props.attributes.slideritems.length === 0) {
    props.setAttributes({
      slideritems: [{
        imgeurl: iconurl,
        svgContent: '',
        imgealt: '',
        title: 'Rejestracja w systemie',
        link: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: iconurl,
      svgContent: '',
      imgealt: '',
      title: 'Rejestracja w systemie',
      link: ''
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        updateSliderItem(index, 'imgeurl', media.url);
        updateSliderItem(index, 'imgealt', media.alt);
        if (media.url.endsWith('.svg')) {
          fetch(media.url).then(response => response.text()).then(svgContent => {
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
      multiple: false
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
  function openMediaLibraryvideo() {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        setAttributes({
          bannervideo: {
            videourl: media.url,
            imgealt: media.alt || ''
          }
        });
      }
    });
    mediaLibrary.open();
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.banner_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    tagName: "p",
    label: stringData.banner_discription,
    value: attributes.bannerdiscription,
    onChange: innernewTitle => setAttributes({
      bannerdiscription: innernewTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.backgrounimage, " "), attributes.backgroundimage.imgurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: attributes.backgroundimage.imgurl,
    alt: attributes.backgroundimage.imgealt,
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: openMediaLibrarybackground,
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.bannervideo,
    value: bannervideo.videourl,
    onChange: newVideoUrl => setAttributes({
      bannervideo: {
        ...bannervideo,
        videourl: newVideoUrl
      }
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: openMediaLibraryvideo,
    className: "button button-secondary"
  }, stringData.select_video), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.shortcut, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.shorticon), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.shortcuttitle,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.shortcutlink,
    placeholder: stringData.Enter_a_link,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.list_remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.list_add_iteme))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "home-main"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    autoPlay: true,
    muted: true,
    loop: true,
    poster: attributes.backgroundimage.imgurl || 'images/home-bg.png'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: attributes.bannervideo.videourl || 'videos/banner-video.mp4',
    type: "video/mp4"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "home-top-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading"
  }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, attributes.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: attributes.bannerdiscription
  }))), slideritems.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "shortcuts-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, stringData.Na_skrty)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "owl-carousel owl-theme shortcuts-carousel"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "card-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link
  }, item.imgeurl.endsWith('.svg') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    class: "svg",
    src: item.imgeurl,
    alt: item.imgealt || 'Image',
    "aria-hidden": "true"
  })), item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))), ";")) : null)));
}

/***/ }),

/***/ "./src/homepage-new-block.js":
/*!***********************************!*\
  !*** ./src/homepage-new-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;
const right = myBlockData.right;

registerBlockType('cwbnamespace/homepagenewblock', {
  title: stringData.homepage_new_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postsectiontitle: {
      type: 'string',
      default: 'Aktualności'
    },
    postperpage: {
      type: 'number',
      // Set the type to 'number'
      default: 3 // Default value for the number of posts per page
    },

    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    buttontitle: {
      type: 'string',
      default: 'Wszystkie aktualności'
    },
    upcomingchecbox: {
      type: 'boolen',
      default: false
    },
    buttonlink: {
      type: 'string',
      default: '#'
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      postsectiontitle,
      buttontitle,
      buttonlink,
      postperpage,
      upcomingchecbox
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "home-articles-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "home-articles-inner"
    }, attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), "[homepage-new-shortcode post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" categories=\"", selectedCategory, "\"]", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "view-more"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex"
    }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: buttonlink,
      class: "link-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon",
      className: "name",
      "aria-hidden": "true"
    })))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postsectiontitle,
    buttontitle,
    buttonlink,
    postperpage,
    upcomingchecbox
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
    try {
      let response;
      if (taxonomyslug === 'category') {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/categories?per_page=100`);
      } else {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/${taxonomyslug}?per_page=100`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          setCategoryOptions([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get post type options
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
    try {
      const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.taxonomies) {
        const taxonomySlug = data.taxonomies[0];
        return taxonomySlug;
      }
      return '';
    } catch (error) {
      console.error('Error fetching taxonomy for post type:', error);
      return '';
    }
  };
  const handleChange = newPerPage => {
    // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
    const parsedPerPage = parseInt(newPerPage) || 0;
    setAttributes({
      postperpage: parsedPerPage
    });
  };
  // Initialize state when component mounts
  useEffect(() => {
    const initializeState = async () => {
      const options = getPostTypeOptions();
      setPostTypeOptions(options);
      if (postType && postType !== 'select') {
        const taxonomyslug = await getTaxonomySlugForPostType(postType);
        fetchCategories(taxonomyslug);
      }
    };
    initializeState();
  }, []);
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/homepage-new-post-shortcode-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "home-articles-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_section_Title,
    placeholder: stringData.Enter_a_title,
    value: postsectiontitle,
    onChange: newTitle => setAttributes({
      postsectiontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: handleChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.BUtton_Title,
    placeholder: stringData.section_button,
    value: buttontitle,
    onChange: newTitle => setAttributes({
      buttontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_link,
    placeholder: stringData.Enter_a_title,
    value: buttonlink,
    onChange: newTitle => setAttributes({
      buttonlink: newTitle
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "home-articles-inner"
  }, attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "view-more"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn d-flex"
  }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buttonlink,
    class: "link-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon",
    className: "name",
    "aria-hidden": "true"
  }))))))));
}

/***/ }),

/***/ "./src/homepage-zkolenia-block.js":
/*!****************************************!*\
  !*** ./src/homepage-zkolenia-block.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShortcodeContentPreview */ "./src/ShortcodeContentPreview.js");

const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  useSelect
} = wp.data;
const siteUrl = myBlockData.siteUrl;
const kelendarz = myBlockData.kelendarz_url;
const {
  useState,
  useEffect
} = wp.element;
const stringData = myBlockData.strings;
const right = myBlockData.right;

registerBlockType('cwbnamespace/homepageszkoleniablock', {
  title: stringData.homepage_szkolenia_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    postsectiontitle: {
      type: 'string',
      default: 'Szkolenia'
    },
    postperpage: {
      type: 'number',
      // Set the type to 'number'
      default: 3 // Default value for the number of posts per page
    },

    postType: {
      type: 'string',
      default: 'select' // Default post type
    },

    selectedCategory: {
      type: 'string',
      default: '' // Default category
    },

    categoryOptions: {
      type: 'array',
      default: [] // Initialize as an empty array
    },

    upcomingchecbox: {
      type: 'boolen',
      default: false
    },
    buttontitle: {
      type: 'string',
      default: 'Wszystkie szkolenia'
    },
    buttonlink: {
      type: 'string',
      default: '#'
    },
    background: {
      type: 'string',
      default: 'dark'
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      postType,
      selectedCategory,
      postsectiontitle,
      buttontitle,
      buttonlink,
      postperpage,
      upcomingchecbox,
      background
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: background == 'dark' ? "training-sec white" : ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "training-sec-wrap"
    }, "[homepage-szkolenia-shortcode post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" categories=\"", selectedCategory, "\"]", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "view-more"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex"
    }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: buttonlink,
      class: "link-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon",
      "aria-hidden": "true"
    })))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    postType,
    selectedCategory,
    postsectiontitle,
    buttontitle,
    buttonlink,
    postperpage,
    upcomingchecbox,
    background
  } = attributes;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [postTypeOptions, setPostTypeOptions] = useState([]);

  // Function to fetch categories based on taxonomy slug
  const fetchCategories = async taxonomyslug => {
    try {
      let response;
      if (taxonomyslug === 'category') {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/categories?per_page=100`);
      } else {
        response = await fetch(`${siteUrl}/wp-json/wp/v2/${taxonomyslug}?per_page=100`);
      }
      if (!response.ok) {
        if (response.status === 404) {
          setCategoryOptions([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        const newCategoryOptions = data.map(category => ({
          value: category.id,
          label: category.name
        }));
        const categoryOptionsWithDefault = [{
          value: '',
          label: stringData.Select_Category
        }, ...newCategoryOptions];
        setCategoryOptions(categoryOptionsWithDefault);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const onCategoryChange = newCategory => {
    setAttributes({
      selectedCategory: newCategory
    });
  };
  const onPostTypeChange = async newPostType => {
    setAttributes({
      postType: newPostType,
      selectedCategory: ''
    });
    const taxonomyslug = await getTaxonomySlugForPostType(newPostType);
    fetchCategories(taxonomyslug);
  };

  // Function to get post type options
  const getPostTypeOptions = () => {
    const postTypes = wp.data.select('core').getPostTypes({
      per_page: -1
    });
    const options = [{
      value: '',
      // Add an empty value for the default option
      label: stringData.Select_Post_Type // Customize the label for the default option
    }];

    if (postTypes && postTypes.length > 0) {
      // console.log(postTypes);
      postTypes.forEach(type => {
        if (type.slug && type.slug !== 'page' && type.slug !== 'attachment' && type.slug !== 'wp_template' && type.slug !== 'wp_template_part' && type.slug !== 'wp_navigation' && type.slug !== 'wp_block' && type.slug !== 'nav_menu_item') {
          options.push({
            value: type.slug,
            label: type.labels.singular_name
          });
        }
      });
    }
    return options;
  };

  // Function to get the taxonomy slug for a given post type
  const getTaxonomySlugForPostType = async postTypeSlug => {
    try {
      const response = await fetch(siteUrl + `/wp-json/wp/v2/types/${postTypeSlug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.taxonomies) {
        const taxonomySlug = data.taxonomies[0];
        return taxonomySlug;
      }
      return '';
    } catch (error) {
      console.error('Error fetching taxonomy for post type:', error);
      return '';
    }
  };
  const handleChange = newPerPage => {
    // Parse the newPerPage value to an integer or set it to 0 if it's not a valid number
    const parsedPerPage = parseInt(newPerPage) || 0;
    setAttributes({
      postperpage: parsedPerPage
    });
  };
  // Initialize state when component mounts
  useEffect(() => {
    const initializeState = async () => {
      const options = getPostTypeOptions();
      setPostTypeOptions(options);
      if (postType && postType !== 'select') {
        const taxonomyslug = await getTaxonomySlugForPostType(postType);
        fetchCategories(taxonomyslug);
      }
    };
    initializeState();
  }, []);
  const apiCallback = siteUrl + '/wp-json/blocks-preview-shortvode/v1/homepage-szkolenia-post-shortcode-type';
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: background == 'dark' ? "training-sec white" : ""
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_section_Title,
    placeholder: stringData.Enter_a_title,
    value: postsectiontitle,
    onChange: newTitle => setAttributes({
      postsectiontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.post_per_page,
    value: attributes.postperpage ? attributes.postperpage.toString() : '',
    onChange: handleChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Selectapost_type,
    value: postType,
    options: getPostTypeOptions(),
    onChange: onPostTypeChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.Select_a_category,
    value: selectedCategory,
    options: categoryOptions,
    onChange: onCategoryChange
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.BUtton_Title,
    placeholder: stringData.section_button,
    value: buttontitle,
    onChange: newTitle => setAttributes({
      buttontitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Button_link,
    placeholder: stringData.Enter_a_title,
    value: buttonlink,
    onChange: newTitle => setAttributes({
      buttonlink: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.background,
    value: background,
    options: [{
      value: '',
      label: stringData.selected_background
    }, {
      value: 'light',
      label: 'light'
    }, {
      value: 'dark',
      label: 'dark'
    }],
    onChange: value => setAttributes({
      background: value
    })
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: upcomingchecbox ? "web-heading  heading-divider" : "web-heading text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "training-sec-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "view-more"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn d-flex"
  }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buttonlink,
    class: "link-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon",
    "aria-hidden": "true"
  }))))))));
}

/***/ }),

/***/ "./src/image-title-block.js":
/*!**********************************!*\
  !*** ./src/image-title-block.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
const right = myBlockData.right;
registerBlockType('kzrnamespace/imagetitleblock', {
  title: stringData.image_title_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    sectionTitle: {
      type: 'string',
      default: 'Struktura'
    },
    backgroundimage: {
      type: 'object',
      default: {
        imgurl: urlimage,
        imgealt: ''
      }
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      sectionTitle,
      backgroundimage
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, sectionTitle)), backgroundimage && backgroundimage.imgurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "structure-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: backgroundimage.imgurl,
      alt: backgroundimage.imgealt
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link d-lg-none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: backgroundimage.imgurl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-inner d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "link-content d-flex align-items-center justify-content-between"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, stringData.Zobacz)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "structure"
    })))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    backgroundimage
  } = attributes;
  function openMediaLibrarybackground() {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.image_title_block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.image_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.backgrounimage), backgroundimage && backgroundimage.imgurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: backgroundimage.imgurl,
    alt: backgroundimage.imgealt,
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: openMediaLibrarybackground,
    className: "button button-secondary"
  }, stringData.Select_an_image))), attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.sectionTitle)), backgroundimage && backgroundimage.imgurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "structure-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: backgroundimage.imgurl,
    alt: backgroundimage.imgealt
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link d-lg-none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: backgroundimage.imgurl,
    target: "_blank",
    class: "d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-inner d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "link-content d-flex align-items-center justify-content-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, stringData.Zobacz)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "right-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "structure"
  })))))))));
}

/***/ }),

/***/ "./src/imge-content-block.js":
/*!***********************************!*\
  !*** ./src/imge-content-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl,
  CheckboxControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('giosnamespace/img-content-block', {
  title: stringData.image_section_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems,
      selectdesign,
      upcomingchecbox
    } = attributes;
    const {
      selectheading
    } = items;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: item.upcomingchecbox ? "web-heading heading-divider" : "web-heading"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-with-image"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row custom-space"
    }, item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xxl-9 col-xl-8"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      tagName: "p",
      value: item.content
    })), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-xxl-3 col-xl-4"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    }))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    items,
    selectdesign
  } = attributes;
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        sectionTitle: 'Czym się zajmujemy',
        imgealt: '',
        upcomingchecbox: false,
        content: 'System KZR INiG jest to globalny system certyfikacji, którego właścicielem jest INiG-PIB.',
        imgeurl: urlimage,
        background: 'white',
        position: 'right',
        selectheading: 'h2'
      }]
    });
  }
  function addItem(index) {
    const newItem = {
      sectionTitle: 'Czym się zajmujemy',
      imgealt: '',
      upcomingchecbox: false,
      content: 'System KZR INiG jest to globalny system certyfikacji, którego właścicielem jest INiG-PIB.',
      imgeurl: urlimage,
      background: 'white',
      position: 'right',
      selectheading: 'h2'
    };
    return newItem;
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: stringData.Select_an_image,
      multiple: false
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
    setAttributes({
      items: updatedItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.image_block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "section ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Informacja_sectiont_title,
    value: item.sectionTitle,
    onChange: newTitle => updateItem(index, 'sectionTitle', newTitle)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: item.upcomingchecbox,
    onChange: newChecked => updateItem(index, 'upcomingchecbox', newChecked)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText, {
    tagName: "p",
    label: stringData.Informacja_Enter_a_description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.image_position,
    value: item.position,
    options: [{
      value: '',
      label: stringData.selected_image_position
    }, {
      value: 'right',
      label: 'Prawo'
    }, {
      value: 'left',
      label: 'Lewo'
    }],
    onChange: value => updateItem(index, 'position', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.background,
    value: item.background,
    options: [{
      value: '',
      label: stringData.selected_background
    }, {
      value: 'white',
      label: 'białe'
    }, {
      value: '#EEF3F6',
      label: 'jasnoszare'
    }],
    onChange: value => updateItem(index, 'background', value)
  }), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => updateItem(index, 'imgeurl', ''),
    className: "button button-danger"
  }, stringData.Informacja_Delete_Image)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Informacja_Select_an_image))))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: item.upcomingchecbox ? "web-heading heading-divider" : "web-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-with-image",
    style: {
      background: item.background
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row custom-space",
    style: item.position === 'left' ? {
      flexDirection: 'row-reverse'
    } : {}
  }, item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-xxl-9 col-xl-8"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: item.content
  })), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-xxl-3 col-xl-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  }))))))));
}

/***/ }),

/***/ "./src/kod.js":
/*!********************!*\
  !*** ./src/kod.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('kzrnamespace/kodkr', {
  title: stringData.kodzakres,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        title: 'PO',
        discription: 'Miejsce pochodzenia'
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      sectionTitle,
      Titlecontent,
      mapshortcode,
      mainTitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "table-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      class: "table"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, stringData.defaultkod), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, stringData.defaultZakres))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, item.discription)))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    sectionTitle,
    Titlecontent,
    mapshortcode,
    mainTitle
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  if (props.attributes.slideritems.length === 0) {
    props.setAttributes({
      slideritems: [{
        title: 'PO',
        discription: 'Miejsce pochodzenia'
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      title: 'PO',
      discription: 'Miejsce pochodzenia'
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.defaultZakres, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Kod,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Zakres,
    placeholder: stringData.Enter_a_title,
    value: item.discription,
    onChange: value => updateSliderItem(index, 'discription', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove_Zakres))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_Zakres))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "table-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    class: "table"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, stringData.defaultkod), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, stringData.defaultZakres))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, item.discription)))))));
}

/***/ }),

/***/ "./src/kontack.js":
/*!************************!*\
  !*** ./src/kontack.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls,
  InnerBlocks
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl,
  CheckboxControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('kzrnamespace/kontact-block', {
  title: stringData.kontakt_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      slideritems,
      selectdesign,
      upcomingchecbox
    } = attributes;
    const {
      selectheading
    } = items;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content-with-map light-bg",
      style: {
        background: item.background
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-6"
    }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: item.upcomingchecbox ? "web-heading heading-divider" : "web-heading"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.content
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null)), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "map-sec"
    }, item.imgeurl))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    items,
    selectdesign
  } = attributes;
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        sectionTitle: 'Czym się zajmujemy',
        imgealt: '',
        upcomingchecbox: false,
        content: 'System KZR INiG jest to globalny system certyfikacji, którego właścicielem jest INiG-PIB.',
        imgeurl: '',
        background: 'white',
        position: 'right',
        selectheading: 'h2'
      }]
    });
  }
  function addItem(index) {
    const newItem = {
      sectionTitle: 'INSTYTUT NAFTY I GAZU – Państwowy Instytut Badawczy',
      imgealt: '',
      upcomingchecbox: false,
      content: '',
      imgeurl: '',
      background: 'white',
      position: 'right',
      selectheading: 'h2'
    };
    return newItem;
  }
  function updateItem(index, key, value) {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setAttributes({
      items: updatedItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.image_block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "section ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Informacja_sectiont_title,
    value: item.sectionTitle,
    onChange: newTitle => updateItem(index, 'sectionTitle', newTitle)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: item.upcomingchecbox,
    onChange: newChecked => updateItem(index, 'upcomingchecbox', newChecked)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.Informacja_Enter_a_description,
    placeholder: stringData.Enter_a_description,
    value: item.content,
    onChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.image_position,
    value: item.position,
    options: [{
      value: '',
      label: stringData.selected_image_position
    }, {
      value: 'right',
      label: 'Prawo'
    }, {
      value: 'left',
      label: 'Lewo'
    }],
    onChange: value => updateItem(index, 'position', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.background,
    value: item.background,
    options: [{
      value: '',
      label: stringData.selected_background
    }, {
      value: 'white',
      label: 'białe'
    }, {
      value: '#EEF3F6',
      label: 'jasnoszare'
    }],
    onChange: value => updateItem(index, 'background', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.mapshortcode,
    placeholder: stringData.Enter_a_description,
    value: item.imgeurl,
    onChange: value => updateItem(index, 'imgeurl', value)
  }))))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content-with-map light-bg",
    style: {
      background: item.background
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-6"
  }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: item.upcomingchecbox ? "web-heading heading-divider" : "web-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.content
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null)), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "map-sec"
  }, item.imgeurl))))));
}

/***/ }),

/***/ "./src/links.js":
/*!**********************!*\
  !*** ./src/links.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText
} = wp.editor;
const {
  registerBlockType
} = wp.blocks;
const {
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  TextControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
const right = myBlockData.right;
const file_icon = myBlockData.icontsvg;
registerBlockType('kzrsnamespace/links', {
  title: stringData.link,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: [{
        imgeurl: file_icon,
        svgContent: '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="73" viewBox="0 0 72 73" fill="none"><path d="M39.6748 4.97754H26.1037C19.9694 4.97754 16.9022 4.97754 14.9965 6.9097C13.0908 8.84187 13.0908 11.9516 13.0908 18.1712V51.1553C13.0908 57.3748 13.0908 60.4846 14.9965 62.4168C16.9022 64.3489 19.9694 64.3489 26.1037 64.3489H45.6231C51.7574 64.3489 54.8246 64.3489 56.7303 62.4168C58.636 60.4846 58.636 57.3748 58.636 51.1553V24.2021C58.636 22.8539 58.636 22.1797 58.3884 21.5736C58.1407 20.9674 57.6706 20.4908 56.7303 19.5374L44.2756 6.9097C43.3353 5.95636 42.8651 5.47969 42.2673 5.22862C41.6694 4.97754 41.0046 4.97754 39.6748 4.97754Z" stroke="#2F3E45" stroke-width="3"/><path class="hover-effect" d="M28.6362 35.3936L46.6362 35.3936" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path class="hover-effect" d="M28.6362 47.5605L40.6362 47.5605" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path d="M40.6367 4.97754V17.1442C40.6367 20.0119 40.6367 21.4458 41.5154 22.3367C42.3941 23.2275 43.8083 23.2275 46.6367 23.2275H58.6367" stroke="#2F3E45" stroke-width="3"/></svg>',
        imgealt: '',
        title: 'UDB Production environment',
        link: ''
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      class: "d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-inner d-flex align-items-center"
    }, item.imgeurl.endsWith('.svg') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: "svg",
      src: item.imgeurl,
      alt: item.imgealt || 'Image'
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "link-content d-flex align-items-center justify-content-between"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "right-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: right,
      alt: "icon",
      "aria-hidden": "true"
    })))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updatedSliderItems = [...slideritems]; // Use a different variable name here
    updatedSliderItems[index][key] = value;
    setAttributes({
      slideritems: updatedSliderItems
    }); // Update the slideritems attribute
  }

  if (props.attributes.slideritems.length === 0) {
    props.setAttributes({
      slideritems: [{
        imgeurl: file_icon,
        svgContent: '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="73" viewBox="0 0 72 73" fill="none"><path d="M39.6748 4.97754H26.1037C19.9694 4.97754 16.9022 4.97754 14.9965 6.9097C13.0908 8.84187 13.0908 11.9516 13.0908 18.1712V51.1553C13.0908 57.3748 13.0908 60.4846 14.9965 62.4168C16.9022 64.3489 19.9694 64.3489 26.1037 64.3489H45.6231C51.7574 64.3489 54.8246 64.3489 56.7303 62.4168C58.636 60.4846 58.636 57.3748 58.636 51.1553V24.2021C58.636 22.8539 58.636 22.1797 58.3884 21.5736C58.1407 20.9674 57.6706 20.4908 56.7303 19.5374L44.2756 6.9097C43.3353 5.95636 42.8651 5.47969 42.2673 5.22862C41.6694 4.97754 41.0046 4.97754 39.6748 4.97754Z" stroke="#2F3E45" stroke-width="3"/><path class="hover-effect" d="M28.6362 35.3936L46.6362 35.3936" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path class="hover-effect" d="M28.6362 47.5605L40.6362 47.5605" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path d="M40.6367 4.97754V17.1442C40.6367 20.0119 40.6367 21.4458 41.5154 22.3367C42.3941 23.2275 43.8083 23.2275 46.6367 23.2275H58.6367" stroke="#2F3E45" stroke-width="3"/></svg>',
        imgealt: '',
        title: 'UDB Production environment',
        link: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: file_icon,
      svgContent: '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="73" viewBox="0 0 72 73" fill="none"><path d="M39.6748 4.97754H26.1037C19.9694 4.97754 16.9022 4.97754 14.9965 6.9097C13.0908 8.84187 13.0908 11.9516 13.0908 18.1712V51.1553C13.0908 57.3748 13.0908 60.4846 14.9965 62.4168C16.9022 64.3489 19.9694 64.3489 26.1037 64.3489H45.6231C51.7574 64.3489 54.8246 64.3489 56.7303 62.4168C58.636 60.4846 58.636 57.3748 58.636 51.1553V24.2021C58.636 22.8539 58.636 22.1797 58.3884 21.5736C58.1407 20.9674 57.6706 20.4908 56.7303 19.5374L44.2756 6.9097C43.3353 5.95636 42.8651 5.47969 42.2673 5.22862C41.6694 4.97754 41.0046 4.97754 39.6748 4.97754Z" stroke="#2F3E45" stroke-width="3"/><path class="hover-effect" d="M28.6362 35.3936L46.6362 35.3936" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path class="hover-effect" d="M28.6362 47.5605L40.6362 47.5605" stroke="#2F3E45" stroke-width="3" stroke-linecap="round"/><path d="M40.6367 4.97754V17.1442C40.6367 20.0119 40.6367 21.4458 41.5154 22.3367C42.3941 23.2275 43.8083 23.2275 46.6367 23.2275H58.6367" stroke="#2F3E45" stroke-width="3"/></svg>',
      imgealt: '',
      title: 'UDB Production environment',
      link: ''
    };
    setAttributes({
      slideritems: [...slideritems, newItem]
    });
  }
  function removeSliderItem(index) {
    const updatedSliderItems = [...slideritems];
    updatedSliderItems.splice(index, 1);
    setAttributes({
      slideritems: updatedSliderItems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select SVG Image',
      library: {
        type: 'image' // Restrict to images
      },

      button: {
        text: 'Select SVG' // Button label text
      },

      multiple: false // Only allow single file selection
    });

    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url && media.url.endsWith('.svg')) {
        updateSliderItem(index, 'imgeurl', media.url);
        updateSliderItem(index, 'imgealt', media.alt);
      } else {
        alert('Please select an SVG file.');
      }
    });
    mediaLibrary.open();
  }
  function openMediaLibrary(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
    });
    mediaLibrary.on('select', function () {
      const media = mediaLibrary.state().get('selection').first().toJSON();
      if (media && media.url) {
        updateSliderItem(index, 'link', media.url);
      }
    });
    mediaLibrary.open();
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.link, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blockbutton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.link_icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.link_content,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.link_url,
    placeholder: stringData.Enter_a_title,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blockbutton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.choose_file)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-inner d-flex align-items-center"
  }, item.imgeurl.endsWith('.svg') && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    class: "svg",
    src: item.imgeurl,
    alt: item.imgealt || 'Image'
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "link-content d-flex align-items-center justify-content-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "right-icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: right,
    alt: "icon",
    "aria-hidden": "true"
  }))))))));
}

/***/ }),

/***/ "./src/scopcertification-block.js":
/*!****************************************!*\
  !*** ./src/scopcertification-block.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  MediaUpload,
  RichText,
  InspectorControls
} = wp.blockEditor;
const {
  registerBlockType
} = wp.blocks;
const {
  Button,
  PanelBody,
  TextControl,
  SelectControl,
  TextareaControl
} = wp.components;
const stringData = myBlockData.strings;
const urlimage = myBlockData.defaultimge;
registerBlockType('kzrnamespace/scopcertification', {
  title: stringData.scop_certifaction,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    size: {
      type: 'string',
      default: '3'
    },
    items: {
      type: 'array',
      default: [{
        link: '',
        imgeurl: urlimage,
        imgealt: '',
        svgContent: '',
        // Add svgContent to attributes
        title: 'Biopaliwa i biopłyny',
        discription: ''
      }]
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      items,
      size
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "cards-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "row custom-space"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `col-xl-${size} col-md-6`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-card light-bg border-radius"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link
    }, item.imgeurl && item.imgeurl.endsWith('.svg') ? '' : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "article-featured-img"
    }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "content text-center"
    }, item.imgeurl && item.imgeurl.endsWith('.svg') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      class: "svg",
      src: item.imgeurl,
      alt: item.imgealt || 'Image'
    })) : '', item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.title)), item.discription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.discription
      }
    }))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    items,
    size
  } = attributes;
  function updateSliderItem(index, key, value) {
    const updateditems = [...items];
    updateditems[index][key] = value;
    setAttributes({
      items: updateditems
    });
  }
  if (items.length === 0) {
    setAttributes({
      items: [{
        link: '',
        imgeurl: urlimage,
        imgealt: '',
        svgContent: '',
        // Add svgContent to attributes
        title: 'Biopaliwa i biopłyny',
        discription: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      link: '',
      imgeurl: urlimage,
      imgealt: '',
      svgContent: '',
      // Add svgContent to attributes
      title: 'Biopaliwa i biopłyny',
      discription: ''
    };
    setAttributes({
      items: [...items, newItem]
    });
  }
  function removeSliderItem(index) {
    const updateditems = [...items];
    updateditems.splice(index, 1);
    setAttributes({
      items: updateditems
    });
  }
  function openMediaLibrarysecond(index) {
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.design_size,
    value: size,
    options: [{
      value: '',
      label: stringData.selected_design_size
    }, {
      value: 6,
      label: 2
    }, {
      value: 4,
      label: 3
    }, {
      value: 3,
      label: 4
    }],
    onChange: newSize => setAttributes({
      size: newSize
    })
  }), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.imageicon, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => openMediaLibrarysecond(index),
    className: "button button-secondary"
  }, stringData.addmedia), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.blocktitle,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: stringData.blockdiscription,
    placeholder: stringData.Enter_a_discription,
    value: item.discription,
    onChange: value => updateSliderItem(index, 'discription', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.blocklink,
    placeholder: stringData.Enter_a_link,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.block_remove))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.block_add))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cards-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "row custom-space"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `col-xl-${size} col-md-6`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-card light-bg border-radius"
  }, item.imgeurl && item.imgeurl.endsWith('.svg') ? '' : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "article-featured-img"
  }, item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "content text-center"
  }, item.imgeurl && item.imgeurl.endsWith('.svg') ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    class: "svg",
    src: item.imgeurl,
    alt: item.imgealt || 'Image'
  })) : '', item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, item.title)), item.discription && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.discription
    }
  }))))))));
}

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_banner_block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-banner-block.js */ "./src/home-banner-block.js");
/* harmony import */ var _homepage_new_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homepage-new-block.js */ "./src/homepage-new-block.js");
/* harmony import */ var _homepage_zkolenia_block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./homepage-zkolenia-block.js */ "./src/homepage-zkolenia-block.js");
/* harmony import */ var _imge_content_block_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./imge-content-block.js */ "./src/imge-content-block.js");
/* harmony import */ var _image_title_block_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./image-title-block.js */ "./src/image-title-block.js");
/* harmony import */ var _faq_toggle_block_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./faq-toggle-block.js */ "./src/faq-toggle-block.js");
/* harmony import */ var _scopcertification_block_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scopcertification-block.js */ "./src/scopcertification-block.js");
/* harmony import */ var _kod_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./kod.js */ "./src/kod.js");
/* harmony import */ var _Infographic_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Infographic.js */ "./src/Infographic.js");
/* harmony import */ var _certification_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./certification.js */ "./src/certification.js");
/* harmony import */ var _links_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./links.js */ "./src/links.js");
/* harmony import */ var _Documents_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Documents.js */ "./src/Documents.js");
/* harmony import */ var _kontack_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./kontack.js */ "./src/kontack.js");
/* harmony import */ var _add_title_block_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-title-block.js */ "./src/add-title-block.js");
/* harmony import */ var _different_post_design_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./different_post-design.js */ "./src/different_post-design.js");
/* harmony import */ var _api_table_block_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./api-table-block.js */ "./src/api-table-block.js");
















}();
/******/ })()
;
//# sourceMappingURL=index.js.map