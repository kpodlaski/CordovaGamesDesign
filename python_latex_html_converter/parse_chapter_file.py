import re
from collections import deque



translate =[
    {
        'name': 'chapter',
        'pattern' : '\\\\chapter{([0-9a-zA-Z/_\- ]+)}',
        'replace_start'  : '<h1>',
        'replace_end' :   '</h1>'
    },
    {
        'name': 'section',
        'pattern' : '\\\\section{([0-9a-zA-Z/_\- ]+)}',
        'replace_start'  : '<h2>',
        'replace_end' :   '</h2>'
    },
    {
        'name': 'subsection',
        'pattern' : '\\\\subsection{([0-9a-zA-Z/_\- ]+)}',
        'replace_start'  : '<h3>',
        'replace_end' :   '</h3>'
    },
    {
        'name': 'text_bf',
        'pattern' : '\\\\textbf{([0-9a-zA-Z/_\- ]+)}',
        'replace_start'  : '<b>',
        'replace_end' :   '</b>'
    },
]

change =[
    {
        'name': 'warning_start',
        'pattern' : '\\begin{warning}',
        'replace'  : '<span class="warning">',
    },
    {
        'name': 'warning_end',
        'pattern' : '\\end{warning}',
        'replace'  : '</span>',
    },
    {
        'name': 'explain_start',
        'pattern' : '\\begin{explain}',
        'replace'  : '</p><div class="code_explained">',
    },
    {
        'name': 'explain_end',
        'pattern' : '\\end{explain}',
        'replace'  : '</div>',
    },
    {
        'name': 'remark_start',
        'pattern' : '\\begin{remark}',
        'replace'  : '</p><div class="remark">',
    },
    {
        'name': 'remark_end',
        'pattern' : '\\end{remark}',
        'replace'  : '</div>',
    },
    {
        'name': 'extercises_start',
        'pattern' : '\\begin{extercises}',
        'replace'  : '</p><div class="question">',
    },
    {
        'name': 'extercises_end',
        'pattern' : '\\end{extercises}',
        'replace'  : '</div>',
    },
    {
        'name': 'js_start',
        'pattern' : '\\begin{js}',
        'replace'  : '</p><pre class="js_code">',
    },
    {
        'name': 'js_end',
        'pattern' : '\\end{js}',
        'replace'  : '</pre>',
    },
    {
        'name': 'html_start',
        'pattern' : '\\begin{html}',
        'replace'  : '</p><pre class="html_code">',
    },
    {
        'name': 'html_end',
        'pattern' : '\\end{html}',
        'replace'  : '</pre>',
    },
    {
        'name': 'shell_start',
        'pattern' : '\\begin{shell}',
        'replace'  : '</p><pre class="shell_code">',
    },
    {
        'name': 'shell_end',
        'pattern' : '\\end{shell}',
        'replace'  : '</pre>',
    },
    {
        'name': 'shelloutput_start',
        'pattern' : '\\begin{shelloutput}',
        'replace'  : '</p><pre class="shelloutput_code">',
    },
    {
        'name': 'shelloutput_end',
        'pattern' : '\\end{shelloutput}',
        'replace'  : '</pre>',
    },

    {
        'name': 'php_start',
        'pattern': '\\begin{php}',
        'replace': '</p><pre class="php_code">',
    },
    {
        'name': 'php_end',
        'pattern': '\\end{php}',
        'replace': '</pre>',
    },
]

enumeratives =[
    {
        'latex_cmd' : 'itemize',
        'html_tag' : 'ul',
    },
    {
        'latex_cmd' : 'enumerate',
        'html_tag' : 'ol',
    },
    {
        'latex_cmd' : 'description',
        'html_tag' : 'dl',
    }
]

js_inline_pattern = re.compile('\\\\begin{js}[.\n\r]+\\\\end{js}')
html_inline_pattern = re.compile('\\\\begin{html}[.\n\r]+\\\\end{html}')
shell_inline_pattern = re.compile('\\\\begin{shell}[.\n\r]+\\\\end{shell}')
shell_output_inline_pattern = re.compile('\\\\begin{shelloutput}[.\n\r]+\\\\end{shelloutput}')
php_output_inline_pattern = re.compile('\\\\begin{php}[.\n\r]+\\\\end{php}')



latex_commands ={
    'warning' : {
                    'begin_replace' : '<span class="warning">',
                    'end_replace'   : '</span>',
                    'tag'           : 'span',
                    'new_line'      :False,
                },
    'explain' : {
                    'begin_replace' : '<div class="code_explained">',
                    'end_replace'   : '</div>',
                    'tag'           : 'div',
                    'new_line'      :True,
    },
    'remark'  : {
                    'begin_replace' : '<div class="remark">',
                    'end_replace'   : '</div>',
                    'tag'           : 'div',
                    'new_line'      :True,
    },
    'extercises': {
                    'begin_replace' : '<div class="question">',
                    'end_replace'   : '</div>',
                    'tag'           : 'div',
                    'new_line': True,
    },
    'js':         {
                    'begin_replace' : '<pre class="js_code">',
                    'end_replace'   : '</pre>',
                    'tag'           : 'pre',
                    'new_line': False,
    },
    'html':      {
                        'begin_replace'  : '<pre class="html_code">',
                        'end_replace'  : '</pre>',
                        'tag'           : 'pre',
                        'new_line'      :False,
    },
    'shell':    {
                    'begin_replace'  : '<pre class="shell_code">',
                    'end_replace'  : '</pre>',
                    'tag'           : 'pre',
                    'new_line': False,
    },
    'shelloutput': {
                    'begin_replace'  : '<pre class="shelloutput_code">',
                    'end_replace'  : '</pre>',
                    'tag'           : 'pre',
                    'new_line': False,
    },
    'php':     {
                    'begin_replace': '<pre class="php_code">',
                    'end_replace': '</pre>',
                    'tag'           : 'pre',
                    'new_line': False,
    },
    'itemize':  {
                    'begin_replace': '<ul>',
                    'end_replace': '</ul>',
                    'tag': 'ul',
                    'new_line': False,
    },
    'enumerate':  {
                    'begin_replace': '<ol>',
                    'end_replace': '</ol>',
                    'tag': 'ol',
                    'new_line': False,
    },
    'description':  {
                    'begin_replace': '<dl>',
                    'end_replace': '</dl>',
                    'tag': 'dl',
                    'new_line': False,
    },
    'tabularx' : {
                    'begin_replace': '<table><tr><td>',
                    'end_replace': '</td></tr></table>',
                    'tag': 'table',
                    'new_line': False,
    }
}

latex_inline_commands ={
    'chapter' : {
        'begin_replace'  : '<h1>',
        'end_replace' :   '</h1>',
        'new_line': True,
    },
    'section' : {
        'begin_replace'  : '<h2>',
        'end_replace' :   '</h2>',
        'new_line': True,
    },
    'subsection':
    {
        'begin_replace'  : '<h3>',
        'end_replace' :   '</h3>',
        'new_line': True,
    },
    'paragraph*':
    {
        'begin_replace'  : '<b>',
        'end_replace' :   '</b>',
        'new_line': True,
    },
    'textbf':{
        'begin_replace'  : '<b>',
        'end_replace' :   '</b>',
        'new_line': False,
    },
    #Only for items in description
    'item': {
        'begin_replace'  : '</dd><dt>',
        'end_replace' :   '</dt><dd>',
        'new_line': False,
    },
    'label': {
        'begin_replace' : '<a name="',
        'end_replace' : '"></a>',
        'new_line' : False,
    },
    'ref': {
        'begin_replace' : '<a href="',
        'end_replace' : '">here</a>',
        'new_line' : False,
    },
}

def parse_chapter_file(ch_file, labels = {}):
    file = open('templates/chapter_template.html', 'r')
    template = file.read().strip()
    file.close()
    file = open(ch_file, 'r')
    orig_chapter = file.read().strip()
    file.close()
    orig_chapter = orig_chapter.replace("<", "&lt;").replace(">", "&gt;")
    chapter = ''
    end_of_text =False
    actual_position = 0
    opened_tags = deque("body")
    pattern_command = re.compile("\\\\([0-9a-zA-Z/_\-*]+){([0-9a-zA-Z/_\-\s,]+)}")
    pattern_item_parameter = re.compile("\[([0-9a-zA-Z/_\-]+)\]")
    while not end_of_text:
        action = None
        test = pattern_command.search(orig_chapter, actual_position)
        index_endl = orig_chapter.find("\n\n", actual_position)
        if test:
            index_cmd = test.start()
            if index_endl==-1:
                new_position = index_cmd
                action = "cmd"
            else:
                new_position = min(index_cmd, index_endl)
                if index_cmd < index_endl:
                    action="cmd"
                else:
                    action = "endl"
        elif index_endl>-1:
            new_position = index_endl
            action = "endl"
        else:
            end_of_text=True
            continue
        last_tag = opened_tags[-1]
        if action == "cmd" :
            #print( test.group(1) +"_"+ test.group(2) )
            if test.group(1) == 'begin':
                todo = latex_commands[test.group(2).strip()]
                chapter+= orig_chapter[actual_position:new_position]
                if todo['new_line'] and last_tag == "p":
                    chapter += "</p>"
                    opened_tags.pop()
                chapter+=todo['begin_replace']
                opened_tags.append(todo['tag'])
                if todo['new_line']:
                    chapter += "<p>"
                    opened_tags.append("p")
                actual_position = test.end()
                continue
            if test.group(1) == 'end':
                todo = latex_commands[test.group(2).strip()]
                chapter+= orig_chapter[actual_position:new_position]
                if todo['new_line'] and last_tag == "p":
                    chapter += orig_chapter[actual_position:new_position] + "</p>"
                    opened_tags.pop()
                chapter+=todo['end_replace']
                opened_tags.pop()
                if todo['new_line']:
                    chapter += "<p>"
                    opened_tags.append("p")
                actual_position = test.end()
                continue
            todo = latex_inline_commands[test.group(1)]
            #Register labels
            if test.group(1) == 'label':
                labels[test.group(2)] = ch_file
            chapter += orig_chapter[actual_position:new_position]
            if todo['new_line'] and last_tag == "p":
                chapter+= "</p>"
                opened_tags.pop()
            _repl = test.group(2)
            if test.group(1) == 'ref':
                if labels[test.group(2)]:
                    _repl=labels[test.group(2)]+"#"+test.group(2)
                    _repl=_repl.replace(".tex", ".html").replace("../chapters/", "")
                    print(_repl)
            chapter+=todo['begin_replace']+_repl+todo['end_replace']
            if todo['new_line']:
                chapter += "<p>"
                opened_tags.append("p")
            actual_position = test.end()
            continue
        if action == "endl":
            #print (str(actual_position) +" "+ str(new_position))
            chapter += orig_chapter[actual_position:new_position]
            if last_tag == "pre":
                actual_position = new_position+2
                continue
            if last_tag == "p":
                chapter+="</p><p>"
            else:
                chapter += "<p>"
                opened_tags.append("p")
            actual_position = new_position + 2
    #Tables
    tbl_start = chapter.find("<table><tr><td>")
    pattern_tabx_params= re.compile("{[0-9a-zA-z|\\\\]+}{[0-9a-zA-z|\\\\]+}")
    #print(pattern_tabx_params.search(chapter))
    chapter=re.sub(pattern_tabx_params,"",chapter)
    chapter = re.sub(r'\\hline', "", chapter)
    while tbl_start >-1:
        tbl_end = chapter.find("</td></tr></table>",tbl_start)
        amp = chapter.find("&",tbl_start,tbl_end)
        while amp >-1:
            chapter=chapter[:amp]+"</td><td>"+chapter[(amp+1):]
            tbl_end+=78
            amp = chapter.find("&", tbl_start, tbl_end)
        eline = chapter.find("\\\\",tbl_start,tbl_end) #8 as replacement is longer than object to replace
        while eline>-1:
            chapter = chapter[:eline] + "</td></tr><tr><td>" + chapter[(eline + 1):]
            tbl_end+=15
            eline = chapter.find("\\\\", tbl_start, tbl_end)
        tbl_start = chapter.find("<table><tr><td>",tbl_end) #16 as replacement is longer than object to replace
    #Final operations
    pattern_item_parameter = re.compile("\\\\item{([0-9a-zA-Z/_\-\. :]+)}")
    test = pattern_item_parameter.search(chapter)
    while test:
        chapter = chapter[:test.start()] + '</dd><dt>' + test.group(1) + '</dt><dd>' + chapter[test.end():]
        test = pattern_item_parameter.search(chapter, test.end())


    ##URL
    pattern_latex_url = re.compile("\\\\url{([a-zA-Z0-9_/:\.?&#=\-]+)}")
    pattern_latex_href = re.compile("\\\\href{([a-zA-Z0-9_/:\.?&#=\-]+)}{([a-zA-Z0-9_/:\. ]+)}")
    chapter = re.sub(pattern_latex_url,r'<a href="\1" target="_blank">\1</a>',chapter)
    chapter = re.sub(pattern_latex_href, r'<a href="\1" target="_blank">\2</a>', chapter)
    pattern_latex_img = re.compile("\\\\includegraphics\[([a-zA-Z= 0-9\.\\\\]+)\]{([a-zA-Z0-9_/:\.?&#=\-]+)}")
    chapter = re.sub(pattern_latex_img, r'<img src="\2" \1>', chapter)
    chapter = chapter.replace("chapters/img","img")
    chapter = chapter.replace("\\item", "</li><li>")
    chapter = chapter.replace("<ol></li>", "<ol>")\
        .replace("<ul></li>", "<ul>") \
        .replace("<dl></dd>", "<dl>")\
        .replace("</ul>", "</li></ul>")\
        .replace("</ol>", "</li></ol>")\
        .replace("</dl>","</dd></dl>")
    chapter= chapter.replace("<td><p>","<td>").replace("</p></td>","</td>")
    pattern_file_listing = re.compile("\\\\(([a-z]+)file){([0-9a-zA-Z/_\-\.]+)}")
    test = pattern_file_listing.search(chapter)
    while test:
        #print("file: "+test.group(1) + "::"+test.group(2))
        chapter = chapter[:test.start()]+'<pre class="from_file" type="'+test.group(1)+'" src="'+test.group(3).replace("chapters/","")+'"></pre>'+chapter[test.end():]
        test = pattern_file_listing.search(chapter,test.end())
    #For all \# \$ \_ type elements in chapter just strip \
    chapter=chapter.replace("\\","")
    out_file = open(ch_file.replace(".tex", ".html").replace("..", "out"), "w")
    chapter = template.replace("$$CHAPTER_CONTENT$$", chapter)
    out_file.write(chapter)
    out_file.close()
    print("File :" +ch_file +" parsed")




def parse_chapter_file_simple(ch_file):
    file = open('templates/chapter_template.html', 'r')
    template = file.read().strip()
    file.close()
    file = open(ch_file, 'r')
    chapter  = file.read().strip()
    file.close()
    chapter= chapter.replace("<","&lt;").replace(">", "&gt;")
    #Find and Replace chapter name
    for el in translate:
        pattern = re.compile(el['pattern'])
        test = re.search(pattern,chapter)
        print ("Patt Test: " + str(el['name'])+" "+ str(test))
        while test:
            chapter = chapter[:test.start()]+el['replace_start']+test.group(1)+el['replace_end']+chapter[test.end():]
            test = re.search(pattern, chapter)
    for el in change:
        chapter = chapter.replace(el['pattern'],el['replace'])
    #Enumeratives
    for el in enumeratives:
        chapter=chapter.replace("\\begin{"+el['latex_cmd']+"}","<"+el['html_tag']+">").replace("\\end{"+el['latex_cmd']+"}","</"+el['html_tag']+">")
    chapter = chapter.replace("\\item ","<li>")
    chapter = chapter.replace("</dl> ", "</dd></dl>")
    pattern = re.compile("\\\\item\[([a-zA-Z\ _]+)\]")
    test = re.search(pattern,chapter)
    while test:
        chapter = chapter[:test.start()] + '</dd><dt>' + test.group(1) + '</dt><dd>' + chapter[test.end():]
        test = re.search(pattern, chapter)
    chapter = chapter.replace("\n\n","</p><p>").replace("\r\n\r\n","</p><p>")
    chapter = chapter.replace("</div></p>", "</div>").replace("</pre></p>", "</pre>").replace("<p></p>","")
    chapter = chapter.replace("<p><div>", "<div>")
    out_file = open(ch_file.replace(".tex",".html").replace("..","out"),"w")
    chapter = template.replace("$$CHAPTER_CONTENT$$",chapter)
    out_file.write(chapter)
    out_file.close()






