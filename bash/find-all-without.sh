## this script shows you how to find files matching a certain glob (*.csproj) but ignoring another glob (*.test.csproj)

CSPROJFILE=$(find . -iname '*.csproj' -a ! -iname '*test.csproj')
#  ^           ^       ^         ^      ^      ^         ^
# assign var   |       |         |      |      |         |
#             find     |         |      |      |         |
#       case insensitive search  |      |      |         |
#              ending with *.csproj     |      |         |
#                             logical and not  |         |
#                        case insensitive name search    |
#                                                    ending with test.csproj
echo "$CSPROJFILE"
