"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var upload = function (selector, conf) {
    var files = [];
    var input = document.querySelector(selector);
    var preview = document.createElement('div');
    preview.classList.add('preview');
    if (input) {
        input.classList.add('disp-none');
        var open_1 = document.createElement('button');
        open_1.classList.add("btn");
        open_1.classList.add("card__submit");
        open_1.textContent = "Open";
        var upload_1 = document.createElement('button');
        upload_1.classList.add("btn");
        upload_1.classList.add("card__submit");
        upload_1.classList.add("active");
        upload_1.textContent = "Upload";
        upload_1.addEventListener("click", function () {
            preview.querySelectorAll('.preview__remove').forEach(function (e) { return e.remove(); });
            var previewInfos = preview.querySelectorAll('.preview__info');
            previewInfos.forEach(function (e) {
                e.classList.add('showing');
                e.innerHTML = "<div class=\"preview__info-progress></div>";
            });
            conf.onUpload(files, previewInfos);
        });
        input.insertAdjacentElement("afterend", open_1);
        input.insertAdjacentElement('afterend', preview);
        input.insertAdjacentElement('afterend', upload_1);
        upload_1.style.display = 'none';
        preview.addEventListener("click", function (e) {
            var _a, _b, _c;
            //@ts-ignore
            var name = (_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.name;
            if (!name) {
                return;
            }
            var newFilesList = [];
            for (var i = 0; i < files.length; i++) {
                if (files[i].name !== name) {
                    newFilesList.push(files[i]);
                }
            }
            files = newFilesList;
            if (!files.length) {
                upload_1.style.display = 'none';
            }
            else {
                upload_1.style.display = 'block';
            }
            var block = (_c = preview.querySelector('[data-name="' + name + '"]')) === null || _c === void 0 ? void 0 : _c.closest('.preview__image');
            block === null || block === void 0 ? void 0 : block.classList.add('removing');
            setTimeout(function () {
                block === null || block === void 0 ? void 0 : block.remove();
            }, 300);
        });
        var changeHandler_1 = function (e) {
            var _a;
            preview.innerHTML = '';
            //@ts-ignore
            files = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files;
            upload_1.style.display = 'none';
            if (!(files === null || files === void 0 ? void 0 : files.length)) {
                return;
            }
            upload_1.style.display = "block";
            var _loop_1 = function (i) {
                var file = files[i];
                if (!file.type.match("image")) {
                    return { value: void 0 };
                }
                var reader = new FileReader();
                var showName = file.name.substr(0, 13);
                reader.onload = function (ev) {
                    var _a;
                    preview.insertAdjacentHTML('afterbegin', "\n                        <div class = \"preview__image\">\n                            <div data-name=\"" + file.name + "\" class=\"preview__remove\">&times;</div>    \n                            <img src=\"" + ((_a = ev.target) === null || _a === void 0 ? void 0 : _a.result) + "\" alt=\"" + file.name + "\"/>\n                            <div class=\"preview__info\"><span>" + (showName.length < file.name.length ? showName + "..." : file.name) + "</span>   " + Math.floor(file.size / 1048576 * 10) / 10 + "Mb</div>    \n                        </div>\n                    ");
                };
                reader.readAsDataURL(file);
            };
            for (var i = 0; i < files.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        };
        if (conf.multi) {
            input.setAttribute('multiple', "");
        }
        if (conf.types) {
            input.setAttribute("accept", conf.types.join(","));
        }
        open_1.addEventListener("click", function () { return input.click(); });
        //@ts-ignore
        input.addEventListener('change', function (e) { return changeHandler_1(e); });
    }
    else {
        throw new Error('File input didn`t founded');
    }
};
exports.upload = upload;
