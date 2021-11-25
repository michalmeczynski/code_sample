import { FC, useCallback, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import classNames from "classnames";

type WysiwygEditorProps = {
  value: string;
  onChange: (html: string) => void;
  hasError?: boolean;
};

const WysiwygEditorComponent: FC<WysiwygEditorProps> = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      const html = convertToHTML({})(editorState.getCurrentContent());
      props.onChange(html);
    },
    [props]
  );

  const setEditorInitialState = useCallback(() => {
    setEditorState(
      EditorState.push(editorState, convertFromHTML({})(props.value), "undo")
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setEditorInitialState();
  }, [setEditorInitialState]);

  const uploadImageCallback = (file: File) => {
    console.log(file);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName={classNames("wysiwyg_editor", props.hasError && "error")}
      toolbarClassName="wysiwyg_editor_toolbar"
      toolbar={{
        options: ["inline", "list", "link", "image", "history"],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["bold", "italic", "underline", "strikethrough"],
          bold: { className: undefined },
          italic: { className: undefined },
          underline: { className: undefined },
          strikethrough: { className: undefined },
          monospace: { className: undefined },
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["unordered", "ordered", "indent", "outdent"],
          unordered: { className: undefined },
          ordered: { className: undefined },
          indent: { className: undefined },
          outdent: { className: undefined },
        },
        link: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: "_self",
          options: ["link", "unlink"],
          link: { className: undefined },
          unlink: { className: undefined },
          linkCallback: undefined,
        },
        // embedded: {
        //   className: undefined,
        //   component: undefined,
        //   popupClassName: undefined,
        //   embedCallback: undefined,
        //   defaultSize: {
        //     height: "auto",
        //     width: "auto",
        //   },
        // },
        image: {
          className: undefined,
          // component: WysiwygUploadImageComponent,
          popupClassName: undefined,
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          uploadCallback: uploadImageCallback,
          previewImage: true,
          inputAccept: "image/jpeg,image/jpg,image/png",
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
        history: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["undo", "redo"],
          undo: { className: undefined },
          redo: { className: undefined },
        },
      }}
      editorClassName="wysiwyg_editor_field"
    />
  );
};

export default WysiwygEditorComponent;
