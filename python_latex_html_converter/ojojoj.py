import re

pattern = re.compile("\\\\begin{shell}([\w\s]+)\\\\end{shell}")
tt =open('../chapters/chapter_cordova_intro.tex').read()
#print(tt)
test = pattern.search(tt)
print(test)
print(test.group(1))
test = pattern.search(tt[test.end():])
print(test)
print(test.group(1))