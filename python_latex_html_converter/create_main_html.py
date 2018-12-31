import re
import parse_chapter_file as pcf

labels = {}
# label {label => file}

def create_menu_html_file():
    chapter_files = []
    file = open('templates/main_template.html', 'r')
    template = file.read().strip()
    file.close()
    content = []
    line = ''
    with open('../cordova_mobile_games.tex', 'r') as texfile:
        line = texfile.readline()
        document_begins = False
        pattern = re.compile('\\\\input{([0-9a-zA-Z\./_\-]+)}')
        chapter_pattern = re.compile('\\\\chapter{([0-9a-zA-Z\./_\- ]+)}')
        while line:
            if line.startswith("\\begin{document}"): document_begins = True
            if document_begins:
                test = re.match(pattern, line)
                if re.match(pattern, line):
                    chapter_title = ""
                    chapter_files.append('../' + test.group(1))
                    with open('../' + test.group(1), 'r') as ch_file:
                        cline = ch_file.readline()
                        while len(chapter_title) == 0 and cline:
                            test2 = re.match(chapter_pattern, cline)
                            if test2:
                                chapter_title = test2.group(1)
                                break
                            else:
                                cline = ch_file.readline()
                    content.append({'file': test.group(1).replace('.tex', '.html'),
                                    'title': chapter_title
                                    })
                    print(test.group(1))
            line = texfile.readline()
    html_list = '';
    for el in content:
        html_list += "\n\t\t\t\t\t\t\t<li><a href='" + el['file'] + "' target='currentPage'>" + el[
            'title'] + "</a></li>"
    template = template.replace("$$MENU_CONTENT$$", html_list + "\n").replace("$$START_PAGE$$", content[0]['file'])

    open('out/index.html', 'w').write(template)
    for chapter_file in chapter_files:
        print("TODO "+ chapter_file)
        pcf.parse_chapter_file(chapter_file, labels)


create_menu_html_file()
#pcf.parse_chapter_file('../chapters/chapter_jquery_ajax.tex')
