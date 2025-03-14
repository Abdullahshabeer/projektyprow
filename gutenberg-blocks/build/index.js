/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/ScriptLoader2.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/ScriptLoader2.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptLoader: function() { return /* binding */ ScriptLoader; }
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/Utils.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var injectScriptTag = function (doc, item, handler) {
    var _a, _b;
    var scriptTag = doc.createElement('script');
    scriptTag.referrerPolicy = 'origin';
    scriptTag.type = 'application/javascript';
    scriptTag.id = item.id;
    scriptTag.src = item.src;
    scriptTag.async = (_a = item.async) !== null && _a !== void 0 ? _a : false;
    scriptTag.defer = (_b = item.defer) !== null && _b !== void 0 ? _b : false;
    var loadHandler = function () {
        scriptTag.removeEventListener('load', loadHandler);
        scriptTag.removeEventListener('error', errorHandler);
        handler(item.src);
    };
    var errorHandler = function (err) {
        scriptTag.removeEventListener('load', loadHandler);
        scriptTag.removeEventListener('error', errorHandler);
        handler(item.src, err);
    };
    scriptTag.addEventListener('load', loadHandler);
    scriptTag.addEventListener('error', errorHandler);
    if (doc.head) {
        doc.head.appendChild(scriptTag);
    }
};
var createDocumentScriptLoader = function (doc) {
    var lookup = {};
    var scriptLoadOrErrorHandler = function (src, err) {
        var item = lookup[src];
        item.done = true;
        item.error = err;
        for (var _i = 0, _a = item.handlers; _i < _a.length; _i++) {
            var h = _a[_i];
            h(src, err);
        }
        item.handlers = [];
    };
    var loadScripts = function (items, success, failure) {
        // eslint-disable-next-line no-console
        var failureOrLog = function (err) { return failure !== undefined ? failure(err) : console.error(err); };
        if (items.length === 0) {
            failureOrLog(new Error('At least one script must be provided'));
            return;
        }
        var successCount = 0;
        var failed = false;
        var loaded = function (_src, err) {
            if (failed) {
                return;
            }
            if (err) {
                failed = true;
                failureOrLog(err);
            }
            else if (++successCount === items.length) {
                success();
            }
        };
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var existing = lookup[item.src];
            if (existing) {
                if (existing.done) {
                    loaded(item.src, existing.error);
                }
                else {
                    existing.handlers.push(loaded);
                }
            }
            else {
                // create a new entry
                var id = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.uuid)('tiny-');
                lookup[item.src] = {
                    id: id,
                    src: item.src,
                    done: false,
                    error: null,
                    handlers: [loaded],
                };
                injectScriptTag(doc, __assign({ id: id }, item), scriptLoadOrErrorHandler);
            }
        }
    };
    var deleteScripts = function () {
        var _a;
        for (var _i = 0, _b = Object.values(lookup); _i < _b.length; _i++) {
            var item = _b[_i];
            var scriptTag = doc.getElementById(item.id);
            if (scriptTag != null && scriptTag.tagName === 'SCRIPT') {
                (_a = scriptTag.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(scriptTag);
            }
        }
        lookup = {};
    };
    var getDocument = function () { return doc; };
    return {
        loadScripts: loadScripts,
        deleteScripts: deleteScripts,
        getDocument: getDocument
    };
};
var createScriptLoader = function () {
    var cache = [];
    var getDocumentScriptLoader = function (doc) {
        var loader = cache.find(function (l) { return l.getDocument() === doc; });
        if (loader === undefined) {
            loader = createDocumentScriptLoader(doc);
            cache.push(loader);
        }
        return loader;
    };
    var loadList = function (doc, items, delay, success, failure) {
        var doLoad = function () { return getDocumentScriptLoader(doc).loadScripts(items, success, failure); };
        if (delay > 0) {
            setTimeout(doLoad, delay);
        }
        else {
            doLoad();
        }
    };
    var reinitialize = function () {
        for (var loader = cache.pop(); loader != null; loader = cache.pop()) {
            loader.deleteScripts();
        }
    };
    return {
        loadList: loadList,
        reinitialize: reinitialize
    };
};
var ScriptLoader = createScriptLoader();


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTinymce: function() { return /* binding */ getTinymce; }
/* harmony export */ });
var getTinymce = function (view) {
    var global = view;
    return global && global.tinymce ? global.tinymce : null;
};



/***/ }),

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/Utils.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/Utils.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configHandlers: function() { return /* binding */ configHandlers; },
/* harmony export */   configHandlers2: function() { return /* binding */ configHandlers2; },
/* harmony export */   isBeforeInputEventAvailable: function() { return /* binding */ isBeforeInputEventAvailable; },
/* harmony export */   isFunction: function() { return /* binding */ isFunction; },
/* harmony export */   isInDoc: function() { return /* binding */ isInDoc; },
/* harmony export */   isTextareaOrInput: function() { return /* binding */ isTextareaOrInput; },
/* harmony export */   mergePlugins: function() { return /* binding */ mergePlugins; },
/* harmony export */   setMode: function() { return /* binding */ setMode; },
/* harmony export */   uuid: function() { return /* binding */ uuid; }
/* harmony export */ });
/* harmony import */ var _components_EditorPropTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/EditorPropTypes */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/EditorPropTypes.js");

var isFunction = function (x) { return typeof x === 'function'; };
var isEventProp = function (name) { return name in _components_EditorPropTypes__WEBPACK_IMPORTED_MODULE_0__.eventPropTypes; };
var eventAttrToEventName = function (attrName) { return attrName.substr(2); };
var configHandlers2 = function (handlerLookup, on, off, adapter, prevProps, props, boundHandlers) {
    var prevEventKeys = Object.keys(prevProps).filter(isEventProp);
    var currEventKeys = Object.keys(props).filter(isEventProp);
    var removedKeys = prevEventKeys.filter(function (key) { return props[key] === undefined; });
    var addedKeys = currEventKeys.filter(function (key) { return prevProps[key] === undefined; });
    removedKeys.forEach(function (key) {
        // remove event handler
        var eventName = eventAttrToEventName(key);
        var wrappedHandler = boundHandlers[eventName];
        off(eventName, wrappedHandler);
        delete boundHandlers[eventName];
    });
    addedKeys.forEach(function (key) {
        var wrappedHandler = adapter(handlerLookup, key);
        var eventName = eventAttrToEventName(key);
        boundHandlers[eventName] = wrappedHandler;
        on(eventName, wrappedHandler);
    });
};
var configHandlers = function (editor, prevProps, props, boundHandlers, lookup) {
    return configHandlers2(lookup, editor.on.bind(editor), editor.off.bind(editor), 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    function (handlerLookup, key) { return function (e) { var _a; return (_a = handlerLookup(key)) === null || _a === void 0 ? void 0 : _a(e, editor); }; }, prevProps, props, boundHandlers);
};
var unique = 0;
var uuid = function (prefix) {
    var time = Date.now();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
var isTextareaOrInput = function (element) {
    return element !== null && (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input');
};
var normalizePluginArray = function (plugins) {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
// eslint-disable-next-line max-len
var mergePlugins = function (initPlugins, inputPlugins) { return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins)); };
var isBeforeInputEventAvailable = function () { return window.InputEvent && typeof InputEvent.prototype.getTargetRanges === 'function'; };
var isInDoc = function (elem) {
    if (!('isConnected' in Node.prototype)) {
        // Fallback for IE and old Edge
        var current = elem;
        var parent_1 = elem.parentNode;
        while (parent_1 != null) {
            current = parent_1;
            parent_1 = current.parentNode;
        }
        return current === elem.ownerDocument;
    }
    return elem.isConnected;
};
var setMode = function (editor, mode) {
    if (editor !== undefined) {
        if (editor.mode != null && typeof editor.mode === 'object' && typeof editor.mode.set === 'function') {
            editor.mode.set(mode);
        }
        else { // support TinyMCE 4
            editor.setMode(mode);
        }
    }
};


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/Editor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/Editor.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: function() { return /* binding */ Editor; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ScriptLoader2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ScriptLoader2 */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/ScriptLoader2.js");
/* harmony import */ var _TinyMCE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TinyMCE */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/Utils.js");
/* harmony import */ var _EditorPropTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditorPropTypes */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/EditorPropTypes.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





/**
 * @see {@link https://www.tiny.cloud/docs/tinymce/7/react-ref/} for the TinyMCE React Technical Reference
 */
var Editor = /** @class */ (function (_super) {
    __extends(Editor, _super);
    function Editor(props) {
        var _a, _b, _c;
        var _this = _super.call(this, props) || this;
        _this.rollbackTimer = undefined;
        _this.valueCursor = undefined;
        _this.rollbackChange = function () {
            var editor = _this.editor;
            var value = _this.props.value;
            if (editor && value && value !== _this.currentContent) {
                editor.undoManager.ignore(function () {
                    editor.setContent(value);
                    // only restore cursor on inline editors when they are focused
                    // as otherwise it will cause a focus grab
                    if (_this.valueCursor && (!_this.inline || editor.hasFocus())) {
                        try {
                            editor.selection.moveToBookmark(_this.valueCursor);
                        }
                        catch (e) { /* ignore */ }
                    }
                });
            }
            _this.rollbackTimer = undefined;
        };
        _this.handleBeforeInput = function (_evt) {
            if (_this.props.value !== undefined && _this.props.value === _this.currentContent && _this.editor) {
                if (!_this.inline || _this.editor.hasFocus()) {
                    try {
                        // getBookmark throws exceptions when the editor has not been focused
                        // possibly only in inline mode but I'm not taking chances
                        _this.valueCursor = _this.editor.selection.getBookmark(3);
                    }
                    catch (e) { /* ignore */ }
                }
            }
        };
        _this.handleBeforeInputSpecial = function (evt) {
            if (evt.key === 'Enter' || evt.key === 'Backspace' || evt.key === 'Delete') {
                _this.handleBeforeInput(evt);
            }
        };
        _this.handleEditorChange = function (_evt) {
            var editor = _this.editor;
            if (editor && editor.initialized) {
                var newContent = editor.getContent();
                if (_this.props.value !== undefined && _this.props.value !== newContent && _this.props.rollback !== false) {
                    // start a timer and revert to the value if not applied in time
                    if (!_this.rollbackTimer) {
                        _this.rollbackTimer = window.setTimeout(_this.rollbackChange, typeof _this.props.rollback === 'number' ? _this.props.rollback : 200);
                    }
                }
                if (newContent !== _this.currentContent) {
                    _this.currentContent = newContent;
                    if ((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isFunction)(_this.props.onEditorChange)) {
                        _this.props.onEditorChange(newContent, editor);
                    }
                }
            }
        };
        _this.handleEditorChangeSpecial = function (evt) {
            if (evt.key === 'Backspace' || evt.key === 'Delete') {
                _this.handleEditorChange(evt);
            }
        };
        _this.initialise = function (attempts) {
            var _a, _b, _c;
            if (attempts === void 0) { attempts = 0; }
            var target = _this.elementRef.current;
            if (!target) {
                return; // Editor has been unmounted
            }
            if (!(0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isInDoc)(target)) {
                // this is probably someone trying to help by rendering us offscreen
                // but we can't do that because the editor iframe must be in the document
                // in order to have state
                if (attempts === 0) {
                    // we probably just need to wait for the current events to be processed
                    setTimeout(function () { return _this.initialise(1); }, 1);
                }
                else if (attempts < 100) {
                    // wait for ten seconds, polling every tenth of a second
                    setTimeout(function () { return _this.initialise(attempts + 1); }, 100);
                }
                else {
                    // give up, at this point it seems that more polling is unlikely to help
                    throw new Error('tinymce can only be initialised when in a document');
                }
                return;
            }
            var tinymce = (0,_TinyMCE__WEBPACK_IMPORTED_MODULE_2__.getTinymce)(_this.view);
            if (!tinymce) {
                throw new Error('tinymce should have been loaded into global scope');
            }
            var finalInit = __assign(__assign(__assign(__assign({}, _this.props.init), { selector: undefined, target: target, readonly: _this.props.disabled, inline: _this.inline, plugins: (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.mergePlugins)((_a = _this.props.init) === null || _a === void 0 ? void 0 : _a.plugins, _this.props.plugins), toolbar: (_b = _this.props.toolbar) !== null && _b !== void 0 ? _b : (_c = _this.props.init) === null || _c === void 0 ? void 0 : _c.toolbar }), (_this.props.licenseKey ? { license_key: _this.props.licenseKey } : {})), { setup: function (editor) {
                    _this.editor = editor;
                    _this.bindHandlers({});
                    // When running in inline mode the editor gets the initial value
                    // from the innerHTML of the element it is initialized on.
                    // However we don't want to take on the responsibility of sanitizing
                    // to remove XSS in the react integration so we have a chicken and egg
                    // problem... We avoid it by sneaking in a set content before the first
                    // "official" setContent and using TinyMCE to do the sanitization.
                    if (_this.inline && !(0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isTextareaOrInput)(target)) {
                        editor.once('PostRender', function (_evt) {
                            editor.setContent(_this.getInitialValue(), { no_events: true });
                        });
                    }
                    if (_this.props.init && (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isFunction)(_this.props.init.setup)) {
                        _this.props.init.setup(editor);
                    }
                }, init_instance_callback: function (editor) {
                    var _a, _b;
                    // check for changes that happened since tinymce.init() was called
                    var initialValue = _this.getInitialValue();
                    _this.currentContent = (_a = _this.currentContent) !== null && _a !== void 0 ? _a : editor.getContent();
                    if (_this.currentContent !== initialValue) {
                        _this.currentContent = initialValue;
                        // same as resetContent in TinyMCE 5
                        editor.setContent(initialValue);
                        editor.undoManager.clear();
                        editor.undoManager.add();
                        editor.setDirty(false);
                    }
                    var disabled = (_b = _this.props.disabled) !== null && _b !== void 0 ? _b : false;
                    (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.setMode)(_this.editor, disabled ? 'readonly' : 'design');
                    // ensure existing init_instance_callback is called
                    if (_this.props.init && (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isFunction)(_this.props.init.init_instance_callback)) {
                        _this.props.init.init_instance_callback(editor);
                    }
                } });
            if (!_this.inline) {
                target.style.visibility = '';
            }
            if ((0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isTextareaOrInput)(target)) {
                target.value = _this.getInitialValue();
            }
            tinymce.init(finalInit);
        };
        _this.id = _this.props.id || (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.uuid)('tiny-react');
        _this.elementRef = react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        _this.inline = (_c = (_a = _this.props.inline) !== null && _a !== void 0 ? _a : (_b = _this.props.init) === null || _b === void 0 ? void 0 : _b.inline) !== null && _c !== void 0 ? _c : false;
        _this.boundHandlers = {};
        return _this;
    }
    Object.defineProperty(Editor.prototype, "view", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.elementRef.current) === null || _a === void 0 ? void 0 : _a.ownerDocument.defaultView) !== null && _b !== void 0 ? _b : window;
        },
        enumerable: false,
        configurable: true
    });
    Editor.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a, _b;
        if (this.rollbackTimer) {
            clearTimeout(this.rollbackTimer);
            this.rollbackTimer = undefined;
        }
        if (this.editor) {
            this.bindHandlers(prevProps);
            if (this.editor.initialized) {
                this.currentContent = (_a = this.currentContent) !== null && _a !== void 0 ? _a : this.editor.getContent();
                if (typeof this.props.initialValue === 'string' && this.props.initialValue !== prevProps.initialValue) {
                    // same as resetContent in TinyMCE 5
                    this.editor.setContent(this.props.initialValue);
                    this.editor.undoManager.clear();
                    this.editor.undoManager.add();
                    this.editor.setDirty(false);
                }
                else if (typeof this.props.value === 'string' && this.props.value !== this.currentContent) {
                    var localEditor_1 = this.editor;
                    localEditor_1.undoManager.transact(function () {
                        // inline editors grab focus when restoring selection
                        // so we don't try to keep their selection unless they are currently focused
                        var cursor;
                        if (!_this.inline || localEditor_1.hasFocus()) {
                            try {
                                // getBookmark throws exceptions when the editor has not been focused
                                // possibly only in inline mode but I'm not taking chances
                                cursor = localEditor_1.selection.getBookmark(3);
                            }
                            catch (e) { /* ignore */ }
                        }
                        var valueCursor = _this.valueCursor;
                        localEditor_1.setContent(_this.props.value);
                        if (!_this.inline || localEditor_1.hasFocus()) {
                            for (var _i = 0, _a = [cursor, valueCursor]; _i < _a.length; _i++) {
                                var bookmark = _a[_i];
                                if (bookmark) {
                                    try {
                                        localEditor_1.selection.moveToBookmark(bookmark);
                                        _this.valueCursor = bookmark;
                                        break;
                                    }
                                    catch (e) { /* ignore */ }
                                }
                            }
                        }
                    });
                }
                if (this.props.disabled !== prevProps.disabled) {
                    var disabled = (_b = this.props.disabled) !== null && _b !== void 0 ? _b : false;
                    (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.setMode)(this.editor, disabled ? 'readonly' : 'design');
                }
            }
        }
    };
    Editor.prototype.componentDidMount = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if ((0,_TinyMCE__WEBPACK_IMPORTED_MODULE_2__.getTinymce)(this.view) !== null) {
            this.initialise();
        }
        else if (Array.isArray(this.props.tinymceScriptSrc) && this.props.tinymceScriptSrc.length === 0) {
            (_b = (_a = this.props).onScriptsLoadError) === null || _b === void 0 ? void 0 : _b.call(_a, new Error('No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array.'));
        }
        else if ((_c = this.elementRef.current) === null || _c === void 0 ? void 0 : _c.ownerDocument) {
            var successHandler = function () {
                var _a, _b;
                (_b = (_a = _this.props).onScriptsLoad) === null || _b === void 0 ? void 0 : _b.call(_a);
                _this.initialise();
            };
            var errorHandler = function (err) {
                var _a, _b;
                (_b = (_a = _this.props).onScriptsLoadError) === null || _b === void 0 ? void 0 : _b.call(_a, err);
            };
            _ScriptLoader2__WEBPACK_IMPORTED_MODULE_1__.ScriptLoader.loadList(this.elementRef.current.ownerDocument, this.getScriptSources(), (_e = (_d = this.props.scriptLoading) === null || _d === void 0 ? void 0 : _d.delay) !== null && _e !== void 0 ? _e : 0, successHandler, errorHandler);
        }
    };
    Editor.prototype.componentWillUnmount = function () {
        var _this = this;
        var editor = this.editor;
        if (editor) {
            editor.off(this.changeEvents(), this.handleEditorChange);
            editor.off(this.beforeInputEvent(), this.handleBeforeInput);
            editor.off('keypress', this.handleEditorChangeSpecial);
            editor.off('keydown', this.handleBeforeInputSpecial);
            editor.off('NewBlock', this.handleEditorChange);
            Object.keys(this.boundHandlers).forEach(function (eventName) {
                editor.off(eventName, _this.boundHandlers[eventName]);
            });
            this.boundHandlers = {};
            editor.remove();
            this.editor = undefined;
        }
    };
    Editor.prototype.render = function () {
        return this.inline ? this.renderInline() : this.renderIframe();
    };
    Editor.prototype.changeEvents = function () {
        var _a, _b, _c;
        var isIE = (_c = (_b = (_a = (0,_TinyMCE__WEBPACK_IMPORTED_MODULE_2__.getTinymce)(this.view)) === null || _a === void 0 ? void 0 : _a.Env) === null || _b === void 0 ? void 0 : _b.browser) === null || _c === void 0 ? void 0 : _c.isIE();
        return (isIE
            ? 'change keyup compositionend setcontent CommentChange'
            : 'change input compositionend setcontent CommentChange');
    };
    Editor.prototype.beforeInputEvent = function () {
        return (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.isBeforeInputEventAvailable)() ? 'beforeinput SelectionChange' : 'SelectionChange';
    };
    Editor.prototype.renderInline = function () {
        var _a = this.props.tagName, tagName = _a === void 0 ? 'div' : _a;
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement(tagName, {
            ref: this.elementRef,
            id: this.id,
            tabIndex: this.props.tabIndex
        });
    };
    Editor.prototype.renderIframe = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea', {
            ref: this.elementRef,
            style: { visibility: 'hidden' },
            name: this.props.textareaName,
            id: this.id,
            tabIndex: this.props.tabIndex
        });
    };
    Editor.prototype.getScriptSources = function () {
        var _a, _b;
        var async = (_a = this.props.scriptLoading) === null || _a === void 0 ? void 0 : _a.async;
        var defer = (_b = this.props.scriptLoading) === null || _b === void 0 ? void 0 : _b.defer;
        if (this.props.tinymceScriptSrc !== undefined) {
            if (typeof this.props.tinymceScriptSrc === 'string') {
                return [{ src: this.props.tinymceScriptSrc, async: async, defer: defer }];
            }
            // multiple scripts can be specified which allows for hybrid mode
            return this.props.tinymceScriptSrc.map(function (item) {
                if (typeof item === 'string') {
                    // async does not make sense for multiple items unless
                    // they are not dependent (which will be unlikely)
                    return { src: item, async: async, defer: defer };
                }
                else {
                    return item;
                }
            });
        }
        // fallback to the cloud when the tinymceScriptSrc is not specified
        var channel = this.props.cloudChannel; // `cloudChannel` is in `defaultProps`, so it's always defined.
        var apiKey = this.props.apiKey ? this.props.apiKey : 'no-api-key';
        var cloudTinyJs = "https://cdn.tiny.cloud/1/".concat(apiKey, "/tinymce/").concat(channel, "/tinymce.min.js");
        return [{ src: cloudTinyJs, async: async, defer: defer }];
    };
    Editor.prototype.getInitialValue = function () {
        if (typeof this.props.initialValue === 'string') {
            return this.props.initialValue;
        }
        else if (typeof this.props.value === 'string') {
            return this.props.value;
        }
        else {
            return '';
        }
    };
    Editor.prototype.bindHandlers = function (prevProps) {
        var _this = this;
        if (this.editor !== undefined) {
            // typescript chokes trying to understand the type of the lookup function
            (0,_Utils__WEBPACK_IMPORTED_MODULE_3__.configHandlers)(this.editor, prevProps, this.props, this.boundHandlers, function (key) { return _this.props[key]; });
            // check if we should monitor editor changes
            var isValueControlled = function (p) { return p.onEditorChange !== undefined || p.value !== undefined; };
            var wasControlled = isValueControlled(prevProps);
            var nowControlled = isValueControlled(this.props);
            if (!wasControlled && nowControlled) {
                this.editor.on(this.changeEvents(), this.handleEditorChange);
                this.editor.on(this.beforeInputEvent(), this.handleBeforeInput);
                this.editor.on('keydown', this.handleBeforeInputSpecial);
                this.editor.on('keyup', this.handleEditorChangeSpecial);
                this.editor.on('NewBlock', this.handleEditorChange);
            }
            else if (wasControlled && !nowControlled) {
                this.editor.off(this.changeEvents(), this.handleEditorChange);
                this.editor.off(this.beforeInputEvent(), this.handleBeforeInput);
                this.editor.off('keydown', this.handleBeforeInputSpecial);
                this.editor.off('keyup', this.handleEditorChangeSpecial);
                this.editor.off('NewBlock', this.handleEditorChange);
            }
        }
    };
    Editor.propTypes = _EditorPropTypes__WEBPACK_IMPORTED_MODULE_4__.EditorPropTypes;
    Editor.defaultProps = {
        cloudChannel: '7',
    };
    return Editor;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component));



/***/ }),

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/EditorPropTypes.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/EditorPropTypes.js ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorPropTypes: function() { return /* binding */ EditorPropTypes; },
/* harmony export */   eventPropTypes: function() { return /* binding */ eventPropTypes; }
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var eventPropTypes = {
    onActivate: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onAddUndo: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforeAddUndo: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforeExecCommand: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforeGetContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforeRenderUI: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforeSetContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBeforePaste: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onBlur: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onChange: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onClearUndos: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onClick: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onContextMenu: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCommentChange: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCompositionEnd: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCompositionStart: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCompositionUpdate: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCopy: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onCut: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDblclick: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDeactivate: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDirty: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDrag: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDragDrop: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDragEnd: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDragGesture: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDragOver: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onDrop: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onExecCommand: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onFocusIn: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onFocusOut: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onGetContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onHide: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onInit: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onInput: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onKeyDown: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onKeyUp: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onLoadContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseDown: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseEnter: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseLeave: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseMove: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseOut: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseOver: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onMouseUp: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onNodeChange: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onObjectResizeStart: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onObjectResized: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onObjectSelected: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onPaste: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onPostProcess: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onPostRender: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onPreProcess: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onProgressState: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onRedo: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onRemove: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onReset: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSaveContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSelectionChange: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSetAttrib: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSetContent: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onShow: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onUndo: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onVisualAid: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onSkinLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onThemeLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onModelLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onPluginLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onIconsLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onLanguageLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onScriptsLoad: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
    onScriptsLoadError: prop_types__WEBPACK_IMPORTED_MODULE_0__.func,
};
var EditorPropTypes = __assign({ apiKey: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, licenseKey: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, id: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, inline: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool, init: prop_types__WEBPACK_IMPORTED_MODULE_0__.object, initialValue: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, onEditorChange: prop_types__WEBPACK_IMPORTED_MODULE_0__.func, value: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, tagName: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_0__.number, cloudChannel: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, plugins: prop_types__WEBPACK_IMPORTED_MODULE_0__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0__.string, prop_types__WEBPACK_IMPORTED_MODULE_0__.array]), toolbar: prop_types__WEBPACK_IMPORTED_MODULE_0__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0__.string, prop_types__WEBPACK_IMPORTED_MODULE_0__.array]), disabled: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool, textareaName: prop_types__WEBPACK_IMPORTED_MODULE_0__.string, tinymceScriptSrc: prop_types__WEBPACK_IMPORTED_MODULE_0__.oneOfType([
        prop_types__WEBPACK_IMPORTED_MODULE_0__.string,
        prop_types__WEBPACK_IMPORTED_MODULE_0__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0__.string),
        prop_types__WEBPACK_IMPORTED_MODULE_0__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0__.shape({
            src: prop_types__WEBPACK_IMPORTED_MODULE_0__.string,
            async: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool,
            defer: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool
        }))
    ]), rollback: prop_types__WEBPACK_IMPORTED_MODULE_0__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0__.number, prop_types__WEBPACK_IMPORTED_MODULE_0__.oneOf([false])]), scriptLoading: prop_types__WEBPACK_IMPORTED_MODULE_0__.shape({
        async: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool,
        defer: prop_types__WEBPACK_IMPORTED_MODULE_0__.bool,
        delay: prop_types__WEBPACK_IMPORTED_MODULE_0__.number
    }) }, eventPropTypes);


/***/ }),

/***/ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: function() { return /* reexport safe */ _components_Editor__WEBPACK_IMPORTED_MODULE_0__.Editor; }
/* harmony export */ });
/* harmony import */ var _components_Editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Editor */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/Editor.js");




/***/ }),

/***/ "./src/Downloadfile.js":
/*!*****************************!*\
  !*** ./src/Downloadfile.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls
} = wp.editor;
const {
  Button,
  PanelBody,
  CheckboxControl
} = wp.components;
const stringData = myBlockData.strings;
registerBlockType('makeupnamespace/download-file-block', {
  title: stringData.download_file_block,
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
      class: "block-link"
    }, files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-row",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: file.fileUrl,
      class: "d-flex align-items-center",
      download: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-inner d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "22",
      viewBox: "0 0 20 22",
      fill: "none"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
      stroke: "url(#paint0_linear_405_15583)",
      "stroke-width": "3",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
      id: "paint0_linear_405_15583",
      x1: "10",
      y1: "20",
      x2: "10",
      y2: "2",
      gradientUnits: "userSpaceOnUse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      "stop-color": "#7E115E"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
      offset: "1",
      "stop-color": "#7E115E",
      "stop-opacity": "0.9"
    }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "link-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.title, " ", file.upcomingchecbox ? `[${file.fileName}, ${file.fileSize}]` : '')))))));
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
  if (props.attributes.files.length === 0) {
    props.setAttributes({
      files: [...files, {
        title: 'TYTUŁ',
        fileUrl: '',
        fileName: '',
        fileSize: 0,
        upcomingchecbox: false
      }]
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
      setAttributes({
        files: newFiles
      });
    }
  };
  const addFile = () => {
    setAttributes({
      files: [...files, {
        title: 'TYTUŁ',
        fileUrl: '',
        fileName: '',
        filetitle: '',
        fileSize: 0,
        upcomingchecbox: false
      }]
    });
  };
  const removeFile = index => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.File_Block_Settings
  }, files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.Title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: file.title,
    className: "form-control",
    onChange: e => {
      const newFiles = [...files];
      newFiles[index].title = e.target.value;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "margin-top"
  }, " "), file.filetitle && stringData.filename, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "margin-top fs-5"
  }, file.filetitle, " "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, index),
    type: "file",
    value: file.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2"
    }, file.fileUrl ? stringData.Change_file : stringData.choose_a_file), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger",
      onClick: () => removeFile(index)
    }, stringData.delete_file)))
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: "show file size",
    className: "mt-4",
    checked: file.upcomingchecbox,
    onChange: isChecked => {
      const newFiles = [...files];
      newFiles[index].upcomingchecbox = isChecked;
      setAttributes({
        files: newFiles
      });
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: addFile,
    className: "button button-primary"
  }, stringData.file_new_file)))), files.map((file, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-row",
    key: index
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-inner d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "22",
    viewBox: "0 0 20 22",
    fill: "none"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M15.333 10.1815L9.99969 15.4177M9.99969 15.4177L4.66635 10.1815M9.99969 15.4177L9.99969 2M2 20L18 20",
    stroke: "url(#paint0_linear_405_15583)",
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", {
    id: "paint0_linear_405_15583",
    x1: "10",
    y1: "20",
    x2: "10",
    y2: "2",
    gradientUnits: "userSpaceOnUse"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
    "stop-color": "#7E115E"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
    offset: "1",
    "stop-color": "#7E115E",
    "stop-opacity": "0.9"
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "link-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, file.title, " ", file.upcomingchecbox ? `[${file.fileName}, ${file.fileSize}]` : ''))))));
}

/***/ }),

/***/ "./src/ShortcodeContentPreview.js":
/*!****************************************!*\
  !*** ./src/ShortcodeContentPreview.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  PanelBody,
  SelectControl,
  TextControl,
  CheckboxControl,
  ColorPalette
} = wp.components;
const {
  InspectorControls
} = wp.blockEditor; // Use wp.blockEditor instead of wp.editor for modern blocks
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
    },
    titleColor: {
      // New attribute for color
      type: 'string',
      default: '#000' // Default color black
    }
  },

  edit: HeadingBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      selectheading,
      sectionTitle,
      upcomingchecbox,
      titleColor
    } = attributes;
    const headingTag = selectheading || 'h1';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (upcomingchecbox ? " heading-divider" : ""),
      style: {
        borderColor: titleColor
      } // Apply the border color
    }, headingTag && React.createElement(headingTag, {
      style: {
        borderColor: titleColor
      }
    }, sectionTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        backgroundColor: titleColor
      }
    }));
  }
});
function HeadingBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    selectheading,
    sectionTitle,
    upcomingchecbox,
    titleColor
  } = attributes;
  const headingTag = selectheading || 'h1';

  // Function to handle color change
  const onChangeTitleColor = newColor => {
    setAttributes({
      titleColor: newColor
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.panelHeading
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: selectheading,
    options: [{
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
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiontt,
    value: sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: upcomingchecbox,
    onChange: newChecked => setAttributes({
      upcomingchecbox: newChecked
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, stringData.chooseTitleColor), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    label: stringData.headerdividercolor,
    value: titleColor,
    onChange: onChangeTitleColor
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (upcomingchecbox ? " heading-divider" : "") // Apply border color to preview in the editor
  }, headingTag && React.createElement(headingTag, {
    style: {
      borderColor: titleColor
    }
  }, sectionTitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      backgroundColor: titleColor
    }
  })));
}

/***/ }),

/***/ "./src/gallery-slider.js":
/*!*******************************!*\
  !*** ./src/gallery-slider.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
registerBlockType('kzrsnamespace/galleryslide', {
  title: stringData.galleryslider,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    slideritems: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      TopsectionTitle
    } = attributes;
    const className = attributes.className;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `gallery-slider ${className}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "owl-carousel owl-theme owl-slider-main"
    }, slideritems.map((item, index) => {
      const totalindex = index + 1;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "item",
        key: index
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "image"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: item.imgeurl,
        alt: item.imgealt ? item.imgealt : ''
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "img-caption"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "slider-counter"
      }, "zdj\u0119cie ", totalindex, " z ", slideritems.length), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "content"
      }, item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "\u0179r\xF3d\u0142o danych: ", item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content))));
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "owl-carousel owl-theme owl-slider-thumbnail"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "item",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt ? item.imgealt : ''
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
        title: '',
        content: '',
        link: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      imgealt: '',
      title: '',
      content: '',
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
  function openMediaLibrary(index) {
    const currentImageURL = slideritems[index]?.imgeurl;

    // Initialize the media library frame
    const mediaLibrary = wp.media({
      title: 'Select Image',
      multiple: false,
      library: {
        type: 'image'
      }
    });

    // Pre-select the current image if it exists
    mediaLibrary.on('open', function () {
      if (currentImageURL) {
        wp.ajax.post('fetch_attachment_id_by_url', {
          image_url: currentImageURL
        }).done(function (response) {
          if (response && response.id) {
            const selection = mediaLibrary.state().get('selection');
            const attachment = wp.media.attachment(response.id);
            attachment.fetch();
            selection.add(attachment);
          }
        }).fail(function () {
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.galleryslider, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blockbutton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.link_icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.author_name,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.short_description,
    placeholder: stringData.Enter_a_title,
    value: item.content,
    onChange: value => updateSliderItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove_gallery))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_gallery))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "gallery-slider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "owl-carousel owl-theme owl-slider-main"
  }, slideritems.map((item, index) => {
    const totalindex = index + 1;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "item",
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt ? item.imgealt : ''
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "img-caption"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "slider-counter"
    }, "zdj\u0119cie ", totalindex, " z ", slideritems.length), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "content"
    }, item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "\u0179r\xF3d\u0142o danych: ", item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content))));
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "owl-carousel owl-theme owl-slider-thumbnail"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "item",
    key: index
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt ? item.imgealt : ''
  }))))));
}

/***/ }),

/***/ "./src/home-banner-block.js":
/*!**********************************!*\
  !*** ./src/home-banner-block.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tinymce/tinymce-react */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_content_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.min.css */ "./node_modules/tinymce/skins/ui/oxide/content.min.css");

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




// npm install --save tinymce
registerBlockType('kzrnamespace/homebanner', {
  title: stringData.list,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    sectionTitle: {
      type: 'string',
      default: 'KZR INiG'
    },
    backgroundimage: {
      type: 'object',
      default: {
        imgurl: urlimage,
        imgealt: ''
      }
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
      default: [{
        imgeurl: urlimage,
        imgealt: '',
        title: 'Dobre praktyki',
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
      class: "home-main"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "home-main-inner"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "home-top-wrap white"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row flex-row-reverse"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-7"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "image"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: attributes.backgroundimage.imgurl,
      alt: attributes.backgroundimage.imgealt ? attributes.backgroundimage.imgealt : ''
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, attributes.sectionTitle)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "home-links-wrap"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "row"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-4"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-link-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      class: "d-flex align-items-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon-sec"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt ? item.imgealt : ''
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))))))))));
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
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
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
        svgContent: '',
        imgealt: '',
        title: 'Dobre praktyki',
        link: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: urlimage,
      svgContent: '',
      imgealt: '',
      title: 'Dobre praktyki',
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

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.Kontakt_home_block
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.banner_title,
    value: attributes.sectionTitle,
    onChange: newTitle => setAttributes({
      sectionTitle: newTitle
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.backgrounimage, " "), attributes.backgroundimage.imgurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: attributes.backgroundimage.imgurl,
    alt: attributes.backgroundimage.imgealt,
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: openMediaLibrarybackground,
    className: "button button-secondary"
  }, stringData.Select_an_image), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    class: "home-main"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "home-main-inner"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "home-top-wrap white"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row flex-row-reverse"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-7"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: attributes.backgroundimage.imgurl,
    alt: attributes.backgroundimage.imgealt ? attributes.backgroundimage.imgealt : ''
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, attributes.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, attributes.sectionTitle)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "home-links-wrap"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "row"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-4"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-link-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link,
    class: "d-flex align-items-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt ? item.imgealt : ''
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, item.title && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title))))))))))));
}

/***/ }),

/***/ "./src/homepage-new-block.js":
/*!***********************************!*\
  !*** ./src/homepage-new-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
      class: "home-article"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider secondary"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), "[homepage-new-shortcode post_type=\"", postType, "\" posts_per_page=\"", postperpage, "\" categories=\"", selectedCategory, "\"]", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex"
    }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: buttonlink,
      class: "link-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      decoding: "async",
      src: right,
      alt: "",
      "aria-hidden": "true"
    })))))));
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
    class: "home-article"
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
  }, attributes.postsectiontitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: upcomingchecbox ? "web-heading heading-divider secondary" : "web-heading  secondary"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.postsectiontitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShortcodeContentPreview__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    apiCallback: apiCallback
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn d-flex"
  }, buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: buttonlink,
    class: "link-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, buttontitle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    decoding: "async",
    src: right,
    alt: "",
    "aria-hidden": "true"
  }))))));
}

/***/ }),

/***/ "./src/image_backgroundcolor.js":
/*!**************************************!*\
  !*** ./src/image_backgroundcolor.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tinymce/tinymce-react */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_content_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.min.css */ "./node_modules/tinymce/skins/ui/oxide/content.min.css");

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





registerBlockType('giosnamespace/section-repeter-block', {
  title: stringData.image_section_block,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    items: {
      type: 'array',
      default: []
    },
    selectdesign: {
      type: 'array',
      default: [{
        value: '',
        // Unique value for style1
        label: stringData.selected_image_side
      }, {
        value: 'left',
        // Unique value for style1
        label: stringData.left
      }, {
        value: 'right',
        // Unique value for style1
        label: stringData.right
      }]
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
      key: index
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "quiz-contain"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-with-image light-bg",
      style: {
        background: item.color
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `col-lg-${item.imgeurl ? '7' : '12'}`
    }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (item.upcomingchecbox ? " heading-divider" : "")
    }, item.selectheading && React.createElement(item.selectheading, {
      className: item.sectionTitle
    }, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: item.content
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null), item.innerbutton && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn text-end"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      className: "btn btn-primary"
    }, item.innerbutton))), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt
    }))))), item.button && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.linkexternal,
      className: "btn btn-primary"
    }, item.button))))));
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
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        imgeurl: urlimage,
        style: '',
        color: '#EFF4F3',
        content: 'W celu wspólnej realizacji projektu, w zakresie określonym przez instytucję zarządzającą krajowym programem albo instytucję zarządzającą regionalnym programem, może zostać utworzone partnerstwo przez podmioty wnoszące do projektu zasoby ludzkie, organizacyjne, techniczne lub finansowe, realizujące wspólnie projekt, zwany dalej „projektem partnerskim”, na warunkach określonych w porozumieniu albo umowie o partnerstwie',
        button: '',
        link: '#',
        upcomingchecbox: false,
        selectheading: 'h1',
        headings: '',
        sectionTitle: stringData.enter_heading
      }]
    });
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
      sectionTitle: stringData.enter_heading
    };
    return newItem;
  }
  function removeItem(index) {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setAttributes({
      items: updatedItems
    });
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
  function addNewBlock() {
    const newItems = [...items, addItem(items.length)];
    setAttributes({
      items: newItems
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.image_block
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "section ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    value: item.selectheading || 'h1',
    options: [{
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
    onChange: newStyle => updateItem(index, 'selectheading', newStyle)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiont,
    value: item.sectionTitle,
    onChange: newTitle => updateItem(index, 'sectionTitle', newTitle)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: item.upcomingchecbox,
    onChange: newChecked => updateItem(index, 'upcomingchecbox', newChecked)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__.Editor, {
    label: stringData.Enter_a_description,
    id: `custom-textarea-control-67`,
    value: item.content,
    ref: textareaRef,
    init: {
      height: 300,
      menubar: false,
      plugins: ['link', 'lists' // Existing plugins
      // Add the code plugin
      ],

      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  lists | removeformat | help' // Add 'code' to the toolbar
      // Additional configuration to mimic TextareaControl styles if needed
    },

    onEditorChange: value => updateItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Background_color,
    value: item.color,
    onChange: value => updateItem(index, 'color', value)
  }), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => updateItem(index, 'imgeurl', ''),
    className: "button button-danger"
  }, stringData.Delete_Image)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.image_side,
    value: item.style,
    options: selectdesign,
    onChange: value => updateItem(index, 'style', value)
  }))))), items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "block-with-image light-bg",
    style: {
      background: item.color
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `row align-items-center justify-content-between ${item.style === 'left' ? 'flex-row-reverse' : ''}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `col-lg-${item.imgeurl ? '7' : '12'}`
  }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (item.upcomingchecbox ? " heading-divider" : "")
  }, item.selectheading && React.createElement(item.selectheading, {
    className: item.sectionTitle
  }, item.sectionTitle)), item.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: item.content
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null)), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "block-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt
  })))))));
}

/***/ }),

/***/ "./src/imge-content-block.js":
/*!***********************************!*\
  !*** ./src/imge-content-block.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tinymce/tinymce-react */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_content_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.min.css */ "./node_modules/tinymce/skins/ui/oxide/content.min.css");

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
const siteurl = myBlockData.siteUrl;




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
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: "block-with-image"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: item.position === 'left' ? 'row custom-space flex-row-reverse' : 'row custom-space'
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-5"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "block-img"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt ? item.imgealt : ''
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "col-lg-7"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: item.upcomingchecbox ? "web-heading heading-divider secondary" : "web-heading secondary"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      value: item.content
    }), item.buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-btn d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.buttonlink,
      class: "link-btn"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, stringData.czytal), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      decoding: "async",
      src: `${siteurl}/wp-content/plugins/ASgutenburg/images/${item.position}.svg`,
      alt: "",
      "aria-hidden": "true"
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks.Content, null))))))));
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
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  if (props.attributes.items.length === 0) {
    props.setAttributes({
      items: [{
        sectionTitle: 'Czym się zajmujemy',
        imgealt: '',
        upcomingchecbox: false,
        content: 'Dzięki Funduszom Europejskim w Małopolsce udało się wykonać już tysiące projektów. ',
        imgeurl: urlimage,
        background: 'white',
        position: 'right',
        selectheading: 'h2',
        buttonlink: '#'
      }]
    });
  }
  function addItem(index) {
    const newItem = {
      sectionTitle: 'Czym się zajmujemy',
      imgealt: '',
      upcomingchecbox: false,
      content: 'Dzięki Funduszom Europejskim w Małopolsce udało się wykonać już tysiące projektów. ',
      imgeurl: urlimage,
      background: 'white',
      position: 'right',
      selectheading: 'h2',
      buttonlink: '#'
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourHeadingBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.Informacja_sectiont_title,
    value: item.sectionTitle,
    onChange: newTitle => updateItem(index, 'sectionTitle', newTitle)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.Informacja_headerdivider,
    checked: item.upcomingchecbox,
    onChange: newChecked => updateItem(index, 'upcomingchecbox', newChecked)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_1__.Editor, {
    label: stringData.Informacja_Enter_a_description,
    id: "custom-textarea-cont",
    value: item.content,
    ref: textareaRef,
    init: {
      height: 300,
      menubar: false,
      plugins: ['link', 'lists' // Existing plugins
      // Add the code plugin
      ],

      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  lists | removeformat | help' // Add 'code' to the toolbar
      // Additional configuration to mimic TextareaControl styles if needed
    },

    onEditorChange: value => updateItem(index, 'content', value)
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
  }, stringData.Informacja_Select_an_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.url,
    value: item.buttonlink,
    onChange: newTitle => updateItem(index, 'buttonlink', newTitle)
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "block-with-image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, items.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: item.position === 'left' ? 'row custom-space flex-row-reverse' : 'row custom-space'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-5"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-img"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt ? item.imgealt : ''
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "col-lg-7"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, item.sectionTitle && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: item.upcomingchecbox ? "web-heading heading-divider secondary" : "web-heading secondary"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, item.sectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: item.content
  }), item.buttonlink && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-btn d-flex"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.buttonlink,
    class: "link-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, stringData.czytal), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    decoding: "async",
    src: `${siteurl}/wp-content/plugins/ASgutenburg/images/${item.position}.svg`,
    alt: "",
    "aria-hidden": "true"
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InnerBlocks, null))))))));
}

/***/ }),

/***/ "./src/kontack.js":
/*!************************!*\
  !*** ./src/kontack.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tinymce/tinymce-react */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_content_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.min.css */ "./node_modules/tinymce/skins/ui/oxide/content.min.css");

const {
  registerBlockType
} = wp.blocks;
const {
  MediaUpload,
  InspectorControls,
  RichText
} = wp.editor;
const {
  Button,
  PanelBody,
  TextareaControl,
  TextControl,
  SelectControl,
  CheckboxControl
} = wp.components;
const {
  useState
} = wp.element;
const stringData = myBlockData.strings;
const imgurl = myBlockData.defaultimge;





registerBlockType('prownamespace/kontact', {
  title: stringData.kontakt_block,
  icon: 'smiley',
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
      files,
      postsectiontitle
    } = attributes;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "content-with-map light-bg ff"
    }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, file.sectiontitle && (file.selectheading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
    }, file.selectheading && React.createElement(file.selectheading, {
      className: file.sectiontitle
    }, file.sectiontitle)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, " ", file.sectiontitle))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "contact-detail"
    }, file.sectioncontent ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      value: file.sectioncontent
    }) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, file.nestedItems.map(nestedItem => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: nestedItem.imgalt
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "content"
    }, nestedItem.title ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      value: nestedItem.title
    }) : null))))), file.shortcode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "map-sec"
    }, file.shortcode))));
  }
});
function CustomBlockEdit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    files
  } = attributes;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.useInstanceId)(CustomBlockEdit);
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const updateItem = (index, key, value) => {
    const newFiles = [...files];
    newFiles[index][key] = value;
    setAttributes({
      files: newFiles
    });
  };
  const onSelectFile = (media, parentIndex, childIndex) => {
    if (media && media.url) {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].fileUrl = media.url;
      newFiles[parentIndex].nestedItems[childIndex].imgalt = media.alt;
      setAttributes({
        files: newFiles
      });
    }
  };
  if (props.attributes.files.length === 0) {
    props.setAttributes({
      files: [...files, {
        sectiontitle: 'Dane kontaktowe',
        upcomingchecbox: false,
        selectheading: '',
        sectioncontent: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mauris sed sem lobortis, vitae dignissim urna ',
        nestedItems: [],
        // An array for nested items
        shortcode: ''
      }]
    });
  }
  const addFile = parentIndex => {
    const newUniqueId = `unique-id-${instanceId}-${Date.now()}`;
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems = [...newFiles[parentIndex].nestedItems, {
      title: 'New Item Title',
      imgalt: '',
      fileUrl: imgurl,
      uniqueid: newUniqueId
    }];
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
  const removeImage = (parentIndex, childIndex) => {
    const newFiles = [...files];
    newFiles[parentIndex].nestedItems[childIndex].fileUrl = ''; // Remove the image URL
    setAttributes({
      files: newFiles
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content-with-map light-bg"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: stringData.contact_block
  }, files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: parentIndex,
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    type: "text",
    label: stringData.sectiontt,
    placeholder: stringData.Enter_a_title,
    value: file.sectiontitle,
    onChange: newStyle => updateItem(parentIndex, 'sectiontitle', newStyle)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: stringData.heading_style,
    className: "margintop",
    value: file.selectheading || 'h1',
    options: [{
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
    onChange: newStyle => updateItem(parentIndex, 'selectheading', newStyle)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    label: stringData.headerdivider,
    checked: file.upcomingchecbox,
    onChange: value => updateItem(parentIndex, 'upcomingchecbox', value)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__.Editor, {
    label: stringData.shortdetail,
    id: `custom-textarea-control-${parentIndex}` // Ensure the ID is dynamic
    ,
    value: file.sectioncontent // Pass the content correctly
    ,
    init: {
      height: 300,
      menubar: false,
      plugins: ['link', 'lists'],
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link lists | removeformat | help'
    },
    onEditorChange: value => updateItem(parentIndex, 'sectioncontent', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "margintop aad-a-e-e-bdbbc-1v57ksj"
  }, stringData.Nested_rowr), file.nestedItems.map((nestedItem, childIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: childIndex,
    className: "nested-item mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__.Editor, {
    label: stringData.contactdetail,
    id: `custom-textarea-control-${nestedItem.uniqueid}`,
    value: nestedItem.title,
    ref: textareaRef,
    init: {
      height: 300,
      menubar: false,
      plugins: ['link', 'lists' // Existing plugins
      // Add the code plugin
      ],

      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  lists | removeformat | help' // Add 'code' to the toolbar
      // Additional configuration to mimic TextareaControl styles if needed
    },

    onEditorChange: newTitle => {
      const newFiles = [...files];
      newFiles[parentIndex].nestedItems[childIndex].title = newTitle;
      setAttributes({
        files: newFiles
      });
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
    onSelect: media => onSelectFile(media, parentIndex, childIndex),
    type: "file",
    value: nestedItem.fileUrl,
    render: ({
      open
    }) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "list-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: nestedItem.fileUrl,
      alt: "icon"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      onClick: open,
      className: "button button-primary me-2 mt-3"
    }, stringData.select_icon), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "buttons-wrapper d-flex mt-3"
    }, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger me-2",
      onClick: () => removeImage(parentIndex, childIndex)
    }, stringData.delete_image), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
      className: "button button-danger me-2",
      onClick: () => removeFile(parentIndex, childIndex)
    }, stringData.delete_point)))
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    onClick: () => addFile(parentIndex),
    className: "button button-primary"
  }, stringData.point)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.mapshortcode,
    value: file.shortcode,
    onChange: newContent => {
      const newFiles = [...files];
      newFiles[parentIndex].shortcode = newContent;
      setAttributes({
        files: newFiles
      });
    }
  }))))), files.map((file, parentIndex) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, file.sectiontitle && (file.selectheading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
  }, file.selectheading && React.createElement(file.selectheading, {
    className: file.sectiontitle
  }, file.sectiontitle)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "web-heading" + (file.upcomingchecbox ? " heading-divider" : "")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, " ", file.sectiontitle))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "contact-detail"
  }, file.sectioncontent ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: file.sectioncontent
  }) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, file.nestedItems.map(nestedItem => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, nestedItem.fileUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: nestedItem.fileUrl,
    alt: nestedItem.imgalt
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "content"
  }, nestedItem.title ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    tagName: "p",
    value: nestedItem.title
  }) : null))))), file.shortcode && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "map-sec"
  }, file.shortcode)))));
}

/***/ }),

/***/ "./src/sidebar-list.js":
/*!*****************************!*\
  !*** ./src/sidebar-list.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tinymce/tinymce-react */ "./node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/index.js");
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ "./node_modules/tinymce/skins/ui/oxide/skin.min.css");
/* harmony import */ var tinymce_skins_ui_oxide_content_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.min.css */ "./node_modules/tinymce/skins/ui/oxide/content.min.css");

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





registerBlockType('kzrsnamespace/wigetdetail', {
  title: stringData.wigetdetail,
  icon: 'smiley',
  category: 'my-custom-category',
  attributes: {
    TopsectionTitle: {
      type: 'string',
      default: 'PROW finansuje inwestycje'
    },
    slideritems: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      TopsectionTitle
    } = attributes;
    const className = attributes.className;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "sidebar"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, TopsectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "sidebar-list"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
      value: item.content
    }))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    TopsectionTitle
  } = attributes;
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
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
        title: '66 mln zł',
        content: 'na budowę dróg lokalnych'
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      title: '66 mln zł',
      content: 'na budowę dróg lokalnych'
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.sectiontt,
    value: TopsectionTitle,
    onChange: newTitle => setAttributes({
      TopsectionTitle: newTitle
    })
  }), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.link, " ", index + 1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.link_content,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tinymce_tinymce_react__WEBPACK_IMPORTED_MODULE_2__.Editor, {
    label: stringData.contactdetail,
    id: `custom-textarea-control-${index}`,
    value: item.content,
    ref: textareaRef,
    init: {
      height: 300,
      menubar: false,
      plugins: ['link', 'lists' // Existing plugins
      // Add the code plugin
      ],

      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link  lists | removeformat | help' // Add 'code' to the toolbar
      // Additional configuration to mimic TextareaControl styles if needed
    },

    onEditorChange: value => updateSliderItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "sidebar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, TopsectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "sidebar-list"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RichText.Content, {
    value: item.content
  }))))))));
}

/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    TopsectionTitle: {
      type: 'string',
      default: 'PROW finansuje inwestycje'
    },
    slideritems: {
      type: 'array',
      default: []
    }
  },
  edit: ImageRepeaterBlockEdit,
  save: function ({
    attributes
  }) {
    const {
      slideritems,
      TopsectionTitle
    } = attributes;
    const className = attributes.className;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      class: `${className}`
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "web-heading heading-divider"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, TopsectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "carousel-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "owl-carousel owl-theme finances-investments"
    }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "item"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon-card text-center"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.imgeurl,
      alt: item.imgealt ? item.imgealt : '',
      "aria-hidden": "true"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "card-content"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content)))))))))));
  }
});
function ImageRepeaterBlockEdit(props) {
  const {
    setAttributes,
    attributes
  } = props;
  const {
    slideritems,
    TopsectionTitle
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
        imgealt: '',
        title: '66 mln zł',
        content: 'na budowę dróg lokalnych',
        link: ''
      }]
    });
  }
  function addItemSec() {
    const newItem = {
      imgeurl: file_icon,
      imgealt: '',
      title: '66 mln zł',
      content: 'na budowę dróg lokalnych',
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
  function openMediaLibrary(index) {
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.tytu,
    value: TopsectionTitle,
    onChange: newTitle => setAttributes({
      TopsectionTitle: newTitle
    })
  }), slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "mb-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, stringData.slider, " ", index + 1), item.imgeurl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: "Image 1",
    className: "mb-3"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blockbutton"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => openMediaLibrary(index),
    className: "button button-secondary"
  }, stringData.link_icon)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.tytu,
    placeholder: stringData.Enter_a_title,
    value: item.title,
    onChange: value => updateSliderItem(index, 'title', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.opis,
    placeholder: stringData.Enter_a_title,
    value: item.content,
    onChange: value => updateSliderItem(index, 'content', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: stringData.link_url,
    placeholder: stringData.Enter_a_title,
    value: item.link,
    onChange: value => updateSliderItem(index, 'link', value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => removeSliderItem(index),
    className: "button button-danger"
  }, stringData.remove_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: addItemSec,
    className: "button button-primary"
  }, stringData.add_link))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    class: "finances-investments-sec"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "web-heading heading-divider"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, TopsectionTitle)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "carousel-block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "owl-carousel owl-theme finances-investments"
  }, slideritems.map((item, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "item"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon-card text-center"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: item.link
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "icon"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: item.imgeurl,
    alt: item.imgealt ? item.imgealt : '',
    "aria-hidden": "true"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "card-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, item.content)))))))))));
}

/***/ }),

/***/ "./node_modules/tinymce/skins/ui/oxide/content.min.css":
/*!*************************************************************!*\
  !*** ./node_modules/tinymce/skins/ui/oxide/content.min.css ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/tinymce/skins/ui/oxide/skin.min.css":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/skins/ui/oxide/skin.min.css ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_banner_block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-banner-block.js */ "./src/home-banner-block.js");
/* harmony import */ var _imge_content_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imge-content-block.js */ "./src/imge-content-block.js");
/* harmony import */ var _homepage_new_block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./homepage-new-block.js */ "./src/homepage-new-block.js");
/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider.js */ "./src/slider.js");
/* harmony import */ var _kontack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./kontack.js */ "./src/kontack.js");
/* harmony import */ var _Downloadfile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Downloadfile.js */ "./src/Downloadfile.js");
/* harmony import */ var _sidebar_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sidebar-list.js */ "./src/sidebar-list.js");
/* harmony import */ var _add_title_block_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./add-title-block.js */ "./src/add-title-block.js");
/* harmony import */ var _image_backgroundcolor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./image_backgroundcolor.js */ "./src/image_backgroundcolor.js");
/* harmony import */ var _gallery_slider_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gallery-slider.js */ "./src/gallery-slider.js");










}();
/******/ })()
;
//# sourceMappingURL=index.js.map