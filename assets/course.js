/* ==========================================================================
   C++ 笔记 · 少儿编程入门
   课程内容数据 —— 编辑此文件即可增删章节与知识点
   块类型：
   h2 | p | list | table | code | tip | warn | note | quiz | exercise | takeaways
   ========================================================================== */

const COURSE = [
  /* ======================================================================
     第 1 章
     ====================================================================== */
  {
    id: 'c1',
    slug: 'hello-world',
    num: '01',
    title: '第一个 C++ 程序',
    subtitle: '认识代码的基本结构，让电脑说出第一句话',
    minutes: 12,
    level: 1,
    keywords: ['Hello World', 'include', 'main', 'cout', 'endl', '编译', '分号', '双引号'],
    goals: [
      '看懂一个最小 C++ 程序的组成部分',
      '用 cout 把一句话显示到屏幕上',
      '避开分号、引号这两个最常见的坑'
    ],
    blocks: [
      { type: 'h2', text: '电脑听不懂人话，但听得懂代码' },
      {
        type: 'p',
        text: 'C++ 是一门很厉害的语言：手机、游戏、火箭、操作系统里都有它的身影。写程序，就像给电脑写一张<strong>一步一步的清单</strong>。今天我们先写一张最短的清单，让电脑在屏幕上说一句 <strong>Hello, World!</strong>。'
      },
      { type: 'h2', text: '从代码到屏幕' },
      {
        type: 'p',
        text: '我们写下的文字叫<strong>源代码</strong>，电脑不能直接读懂。需要一位「翻译官」——<strong>编译器</strong>——把它翻译成电脑能执行的指令。很多同学用 Dev-C++、Code::Blocks 或 VS Code 写代码；在学校机房里，听老师的话按下编译和运行按钮就好。'
      },
      { type: 'h2', text: '拆开一个最小的程序' },
      {
        type: 'code',
        file: 'hello.cpp',
        output: 'Hello, World!',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
      },
      {
        type: 'list',
        items: [
          '<code>#include &lt;iostream&gt;</code> —— 借来一个「输入输出工具箱」，<code>cout</code> 就住在里面。',
          '<code>using namespace std;</code> —— 使用标准库的公共房间，这样写 <code>cout</code> 不用写成 <code>std::cout</code>。',
          '<code>int main()</code> —— 主函数，程序从这扇大门开始执行。',
          '<code>cout &lt;&lt; "Hello, World!" &lt;&lt; endl;</code> —— 把双引号里的文字送到屏幕上，<code>endl</code> 表示换行。',
          '<code>return 0;</code> —— 告诉电脑「顺利结束」，0 代表一切正常。'
        ]
      },
      {
        type: 'tip',
        title: '小提示：分号像句号',
        text: 'C++ 里大多数语句的末尾要加分号 <code>;</code>。少了它，电脑会以为这句话还没说完，编译就会报错。'
      },
      {
        type: 'warn',
        title: '常见坑：中文标点',
        text: '代码里的 <code>" "</code>、<code>;</code>、<code>( )</code> 都必须是英文半角。中文输入法很容易打出 <code>“ ”</code>，程序就会报错。写代码前先把输入法切到英文。'
      },
      { type: 'h2', text: '动手改一改' },
      {
        type: 'p',
        text: '把引号里的文字换成你想说的话，比如你的名字和爱好。注意：每句话都要住在 <code>cout &lt;&lt;</code> 和分号之间。'
      },
      {
        type: 'code',
        file: 'greet.cpp',
        output: '大家好！\n我叫小星，今年 10 岁。\n我喜欢拼乐高，也喜欢写代码。',
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "大家好！" << endl;
    cout << "我叫小星，今年 10 岁。" << endl;
    cout << "我喜欢拼乐高，也喜欢写代码。" << endl;
    return 0;
}`
      },
      {
        type: 'note',
        title: '一个 cout 也能输出很多段',
        text: '用 <code>&lt;&lt;</code> 把文字、数字和变量串起来，最后只写一个分号：<code>cout &lt;&lt; "我今年 " &lt;&lt; age &lt;&lt; " 岁" &lt;&lt; endl;</code>。'
      },
      {
        type: 'quiz',
        question: '一个 C++ 程序从哪里开始执行？',
        options: [
          '<code>int main()</code> 里面的第一句',
          '<code>#include &lt;iostream&gt;</code> 那一行',
          '<code>using namespace std;</code> 那一行',
          '最后一句 <code>return 0;</code>'
        ],
        answer: 0,
        explain: '程序的入口是 <code>main</code> 函数。电脑会从 <code>int main()</code> 的左花括号开始，一句一句往下执行。'
      },
      {
        type: 'exercise',
        title: '打印一张自我介绍',
        task: '用 <code>cout</code> 输出三行文字：第一行打招呼，第二行介绍名字，第三行介绍一个爱好。',
        hint: '一行一个 <code>cout</code>，每一行结尾都加上 <code>&lt;&lt; endl;</code>。',
        answer: '也可以把三行写成三次输出，顺序就是屏幕上从上到下的顺序。',
        answerCode: `cout << "大家好！" << endl;
cout << "我叫小星。" << endl;
cout << "我喜欢拼乐高。" << endl;`
      },
      {
        type: 'takeaways',
        items: [
          'C++ 程序从 <code>int main()</code> 开始执行。',
          '<code>#include &lt;iostream&gt;</code> 让我们可以使用 <code>cout</code>。',
          '语句末尾要加英文分号，字符串要用英文双引号。',
          '<code>endl</code> 负责换行，<code>return 0;</code> 表示程序顺利结束。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 2 章
     ====================================================================== */
  {
    id: 'c2',
    slug: 'variables',
    num: '02',
    title: '变量与数据类型',
    subtitle: '给数据贴上名字，装进合适的小盒子',
    minutes: 14,
    level: 1,
    keywords: ['变量', 'int', 'double', 'char', 'bool', 'string', 'const', '命名', '数据类型'],
    goals: [
      '用变量保存数字、文字和真假值',
      '根据数据特点选择合适的类型',
      '给变量起一个清楚、好读的名字'
    ],
    blocks: [
      { type: 'h2', text: '变量：贴了标签的收纳盒' },
      {
        type: 'p',
        text: '如果每次计算都要重新写一遍数字，程序会又长又乱。变量就像一个个<strong>贴了标签的收纳盒</strong>：标签是名字，盒子里装数据。需要用到数据时，喊名字就行。'
      },
      {
        type: 'code',
        file: 'variables.cpp',
        output: '小星，年龄 10 岁\n身高 1.45 米，等级 A\n喜欢 C++：true',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 10;
    double height = 1.45;
    char grade = 'A';
    bool likesCpp = true;
    string name = "小星";

    cout << name << "，年龄 " << age << " 岁" << endl;
    cout << "身高 " << height << " 米，等级 " << grade << endl;
    cout << boolalpha << "喜欢 C++：" << likesCpp << endl;
    return 0;
}`
      },
      {
        type: 'p',
        text: '每个盒子前都写着类型，后面跟名字，再用 <code>=</code> 放入第一个值。这种「<strong>类型 名字 = 值;</strong>」的写法，就是变量的定义。'
      },
      { type: 'h2', text: '五种常用的数据类型' },
      {
        type: 'table',
        headers: ['类型', '装什么', '例子'],
        rows: [
          ['int', '整数（没有小数点）', '42、-7、2025'],
          ['double', '小数', '3.14、1.45、0.5'],
          ['char', '单个字符，用单引号', "'A'、'#'、'9'"],
          ['bool', '真或假', 'true、false'],
          ['string', '一串文字，用双引号', '"小星"、"C++"']
        ]
      },
      {
        type: 'tip',
        title: 'boolalpha 是什么？',
        text: '<code>bool</code> 默认显示成 <code>1</code> 或 <code>0</code>。加上 <code>boolalpha</code> 后，就会显示成 <code>true</code> 或 <code>false</code>，读起来更直观。'
      },
      { type: 'h2', text: '名字怎么起' },
      {
        type: 'list',
        ordered: true,
        items: [
          '只能用字母、数字和下划线，并且不能以数字开头。',
          '不能和 <code>int</code>、<code>return</code> 这些关键字重名。',
          '区分大小写：<code>age</code> 和 <code>Age</code> 是两个不同的盒子。',
          '起有意义的名字：<code>score</code> 比 <code>a</code> 好，<code>totalPrice</code> 比 <code>tp</code> 好。'
        ]
      },
      { type: 'h2', text: 'const：贴上「请勿修改」的封条' },
      {
        type: 'p',
        text: '有些数字不应该被改动，比如圆周率。给变量加上 <code>const</code>，就给它贴上了封条。<code>const</code> 只能修饰已经初始化的变量。'
      },
      {
        type: 'code',
        file: 'constants.cpp',
        code: `const double PI = 3.14159;
const int DAYS = 7;

// PI = 3.14;  // 编译报错：const 变量不能被修改`
      },
      {
        type: 'warn',
        title: '两种常见错误',
        text: '一、重复定义：同一个作用域里不要写两次 <code>int age = 10;</code>。二、忘了初始化：没有装东西的盒子暂时是「随机值」，不要直接使用。'
      },
      {
        type: 'quiz',
        question: '要保存身高「1.45 米」，用哪种类型最合适？',
        options: ['int', 'double', 'char', 'bool'],
        answer: 1,
        explain: '1.45 带小数点，用 <code>double</code> 保存才精确。用 <code>int</code> 会把它变成 1 或直接报错。'
      },
      {
        type: 'exercise',
        title: '做一张个人信息卡',
        task: '定义三个变量：姓名（string）、年龄（int）、是否喜欢编程（bool），然后把它们输出到屏幕上。',
        hint: '注意字符用单引号，字符串用双引号；<code>bool</code> 想显示 true/false 记得加 <code>boolalpha</code>。',
        answerCode: `string name = "小星";
int age = 10;
bool likesCpp = true;

cout << boolalpha;
cout << "姓名：" << name << endl;
cout << "年龄：" << age << endl;
cout << "喜欢编程：" << likesCpp << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '变量有名字、有类型，用 <code>=</code> 放入第一个值。',
          '<code>int</code> 存整数，<code>double</code> 存小数，<code>char</code> 存单个字符，<code>bool</code> 存真假，<code>string</code> 存文字。',
          '名字要清楚、合法，不要用关键字。',
          '<code>const</code> 声明的变量不能被修改。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 3 章
     ====================================================================== */
  {
    id: 'c3',
    slug: 'input-output',
    num: '03',
    title: '输入与输出',
    subtitle: '用 cout 说话，用 cin 倾听',
    minutes: 14,
    level: 1,
    keywords: ['cin', 'cout', '输入', '输出', 'endl', 'getline', '流'],
    goals: [
      '把多个内容拼成一句话输出',
      '用 cin 从键盘读取数字和单词',
      '分清 <code>&lt;&lt;</code> 和 <code>&gt;&gt;</code> 的方向'
    ],
    blocks: [
      { type: 'h2', text: 'cout 是程序的小喇叭' },
      {
        type: 'p',
        text: '前面的程序只会自己说话，其实 <code>cout</code> 可以把文字和变量混在一起，像串珠子一样串成一句完整的话。'
      },
      {
        type: 'code',
        file: 'speak.cpp',
        output: '我有 5 个苹果。\n分给朋友 2 个，还剩 3 个。',
        code: `int apples = 5;
cout << "我有 " << apples << " 个苹果。" << endl;
cout << "分给朋友 2 个，还剩 " << apples - 2 << " 个。" << endl;`
      },
      {
        type: 'note',
        title: 'cout 里还可以做计算',
        text: '<code>&lt;&lt;</code> 右边可以放算式，比如 <code>apples - 2</code>。电脑会先算出结果，再把它送到屏幕上。'
      },
      { type: 'h2', text: '换行：endl 和 \\n' },
      {
        type: 'p',
        text: '<code>endl</code> 的作用是换行。写成 <code>"\\n"</code> 也能达到同样的效果：它是一段特殊的「换行字符」，放进字符串里就会在屏幕上折行。'
      },
      { type: 'h2', text: 'cin 是程序的小耳朵' },
      {
        type: 'p',
        text: '想让程序听我们说话，就要请出 <code>cin</code>。它从键盘读入数据，存进变量里。箭头方向要记牢：<code>cout &lt;&lt;</code> 是<strong>把数据送出去</strong>，<code>cin &gt;&gt;</code> 是<strong>把数据收进来</strong>。'
      },
      {
        type: 'code',
        file: 'chat.cpp',
        output: '你叫什么名字？小星\n你几岁啦？10\n你好，小星！明年你就 11 岁了。',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;

    cout << "你叫什么名字？";
    cin >> name;
    cout << "你几岁啦？";
    cin >> age;

    cout << "你好，" << name << "！明年你就 " << age + 1 << " 岁了。" << endl;
    return 0;
}`
      },
      {
        type: 'p',
        text: '注意：这里的输出先问问题，不换行，所以输入内容会跟在问题后面，像真正的对话一样。用完 <code>cin</code> 之后，输入的回车会留在缓冲里，下一个 <code>cout</code> 会继续输出。'
      },
      {
        type: 'tip',
        title: '一次读入多个数据',
        text: '可以连着写：<code>cin &gt;&gt; a &gt;&gt; b;</code>。输入时用空格或回车分开，例如 <code>3 5</code>。'
      },
      {
        type: 'warn',
        title: 'cin 遇到空格会停下',
        text: '用 <code>cin &gt;&gt; name</code> 读取带空格的整句（比如「Tom Smith」）只会读到第一个词。要读整行，可以用 <code>getline(cin, name);</code>，后面的章节再细说。'
      },
      {
        type: 'quiz',
        question: '要把键盘输入的数字存进变量，应该用哪个写法？',
        options: [
          '<code>cout &gt;&gt; number;</code>',
          '<code>cin &gt;&gt; number;</code>',
          '<code>cin &lt;&lt; number;</code>',
          '<code>number = cin;</code>'
        ],
        answer: 1,
        explain: '<code>cin</code> 用 <code>&gt;&gt;</code> 把数据「吸进」变量；<code>cout</code> 用 <code>&lt;&lt;</code> 把数据「推出去」。'
      },
      {
        type: 'exercise',
        title: '两数求和',
        task: '让程序读取两个整数，然后输出它们的和。',
        hint: '先定义两个 <code>int</code> 变量，再用 <code>cin &gt;&gt; a &gt;&gt; b;</code> 一次读入。',
        answerCode: `int a, b;
cout << "请输入两个整数：";
cin >> a >> b;
cout << "它们的和是 " << a + b << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '<code>cout &lt;&lt;</code> 负责输出，<code>cin &gt;&gt;</code> 负责输入。',
          '<code>endl</code> 或 <code>"\\n"</code> 都可以换行。',
          '输出里可以直接写算式，电脑会先计算。',
          '一次 <code>cin</code> 可以读入多个值，用空格或回车分隔。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 4 章
     ====================================================================== */
  {
    id: 'c4',
    slug: 'operators',
    num: '04',
    title: '运算符与计算',
    subtitle: '让程序变成会算数的小超人',
    minutes: 15,
    level: 2,
    keywords: ['运算符', '加减乘除', '取余', '自增', '比较', '逻辑', 'bool', '整数除法'],
    goals: [
      '用算术运算符完成计算',
      '理解整数除法为什么会「吞掉」小数',
      '用比较和逻辑运算符表达条件'
    ],
    blocks: [
      { type: 'h2', text: '五个算术运算符' },
      {
        type: 'table',
        headers: ['运算符', '含义', '例子', '结果'],
        rows: [
          ['+', '加', '5 + 3', '8'],
          ['-', '减', '5 - 3', '2'],
          ['*', '乘', '5 * 3', '15'],
          ['/', '除', '7 / 2', '3（整数除法）'],
          ['%', '取余（剩下多少）', '7 % 2', '1']
        ]
      },
      {
        type: 'p',
        text: '<code>%</code> 读作「取余」，也就是做除法后<strong>剩下多少</strong>。把 7 颗糖平均分给 2 个人，每人 3 颗，还剩 1 颗，所以 <code>7 % 2</code> 是 1。'
      },
      {
        type: 'code',
        file: 'math.cpp',
        output: '7 + 2 = 9\n7 - 2 = 5\n7 * 2 = 14\n7 / 2 = 3\n7 % 2 = 1',
        code: `int a = 7, b = 2;
cout << a << " + " << b << " = " << a + b << endl;
cout << a << " - " << b << " = " << a - b << endl;
cout << a << " * " << b << " = " << a * b << endl;
cout << a << " / " << b << " = " << a / b << endl;
cout << a << " % " << b << " = " << a % b << endl;`
      },
      {
        type: 'warn',
        title: '整数除法会吞掉小数',
        text: '两个 <code>int</code> 相除，结果还是 <code>int</code>，小数部分直接被丢掉：<code>7 / 2</code> 得到 3，而不是 3.5。想得到小数，至少让其中一边变成小数：<code>7.0 / 2</code> 得到 3.5。'
      },
      { type: 'h2', text: '自增、自减和简写' },
      {
        type: 'code',
        file: 'steps.cpp',
        code: `int score = 10;

score++;      // 加 1，变成 11
score += 5;   // 加 5，变成 16
score--;      // 减 1，变成 15

cout << score << endl;  // 输出 15`
      },
      {
        type: 'p',
        text: '<code>score++</code> 等价于 <code>score = score + 1</code>；<code>score += 5</code> 等价于 <code>score = score + 5</code>。循环里经常用到它们。'
      },
      { type: 'h2', text: '比较运算符：问一个是非题' },
      {
        type: 'p',
        text: '比较的结果是一个 <code>bool</code> 值：成立就是 <code>true</code>，不成立就是 <code>false</code>。这些运算符是后面 <code>if</code> 和 <code>while</code> 的基础。'
      },
      {
        type: 'table',
        headers: ['运算符', '含义', '例子', '结果'],
        rows: [
          ['>', '大于', '5 > 3', 'true'],
          ['<', '小于', '5 < 3', 'false'],
          ['>=', '大于等于', '5 >= 5', 'true'],
          ['<=', '小于等于', '4 <= 5', 'true'],
          ['==', '等于（两个等号）', '5 == 5', 'true'],
          ['!=', '不等于', '5 != 3', 'true']
        ]
      },
      {
        type: 'warn',
        title: '= 和 == 不是一回事',
        text: '<code>=</code> 是「把右边的值放进左边」，<code>==</code> 才是「比较两边是否相等」。把 <code>==</code> 写成 <code>=</code>，程序常常会偷偷做错事。'
      },
      { type: 'h2', text: '逻辑运算符：把条件组合起来' },
      {
        type: 'table',
        headers: ['运算符', '含义', '什么时候是 true'],
        rows: [
          ['&&', '并且', '两边都成立'],
          ['||', '或者', '至少有一边成立'],
          ['!', '不是', '把 true 变 false，把 false 变 true']
        ]
      },
      {
        type: 'code',
        file: 'ride.cpp',
        output: '能坐过山车吗？true',
        code: `int age = 11;
double height = 1.38;

bool canRide = age >= 10 && height >= 1.35;
cout << boolalpha << "能坐过山车吗？" << canRide << endl;`
      },
      {
        type: 'tip',
        title: '善用括号',
        text: '运算符有优先级，但建议用括号把想先算的部分圈起来，比如 <code>(age + 1) * 2</code>。这样既不会算错，也方便别人读懂。'
      },
      {
        type: 'quiz',
        question: 'C++ 里 <code>8 / 3</code> 的结果是多少？',
        options: ['2.666…', '2', '3', '2.5'],
        answer: 1,
        explain: '两个操作数都是整数，所以执行整数除法，小数部分被丢掉，结果是 2。想得到小数可以写 <code>8.0 / 3</code>。'
      },
      {
        type: 'exercise',
        title: '三门成绩的平均分',
        task: '读取三个小数成绩，输出它们的平均分。',
        hint: '用 <code>double</code> 保存成绩，平均分就是三项相加除以 3。',
        answerCode: `double a, b, c;
cin >> a >> b >> c;
cout << "平均分：" << (a + b + c) / 3 << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '算术运算符：<code>+ - * / %</code>，其中 <code>%</code> 求余数。',
          '两个整数相除会丢掉小数，需要小数时让一边变成小数。',
          '比较运算符的结果是 <code>true</code> 或 <code>false</code>。',
          '用 <code>&&</code>、<code>||</code>、<code>!</code> 组合条件。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 5 章
     ====================================================================== */
  {
    id: 'c5',
    slug: 'conditions',
    num: '05',
    title: '条件分支 if',
    subtitle: '让程序学会做选择',
    minutes: 16,
    level: 2,
    keywords: ['if', 'else', 'else if', '条件', '分支', '判断', '花括号'],
    goals: [
      '用 if / else 写出二选一',
      '用 else if 处理多种情况',
      '避开分号、赋值号造成的逻辑错误'
    ],
    blocks: [
      { type: 'h2', text: '程序也会做选择题' },
      {
        type: 'p',
        text: '生活中到处都是选择：如果下雨，就带伞；否则，就戴帽子。程序里的 <code>if</code> 就是这样的选择题——条件成立时执行一段代码，不成立时执行另一段。'
      },
      {
        type: 'code',
        file: 'pass.cpp',
        output: '请输入成绩：75\n及格啦！',
        code: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "请输入成绩：";
    cin >> score;

    if (score >= 60) {
        cout << "及格啦！" << endl;
    } else {
        cout << "再努力一点点。" << endl;
    }
    return 0;
}`
      },
      {
        type: 'p',
        text: '<code>if</code> 后面的小括号里放条件，条件成立（为 true）就执行紧跟的花括号；不成立就跳到 <code>else</code> 的花括号。'
      },
      { type: 'h2', text: 'else if：不止两个选项' },
      {
        type: 'p',
        text: '如果情况有三种、四种，可以继续接 <code>else if</code>。程序会从上往下检查，遇到第一个成立的条件就执行它，后面的全部跳过。'
      },
      {
        type: 'code',
        file: 'grade.cpp',
        output: '请输入成绩：86\nB：很不错！',
        code: `int score;
cin >> score;

if (score >= 90) {
    cout << "A：太棒了！" << endl;
} else if (score >= 75) {
    cout << "B：很不错！" << endl;
} else if (score >= 60) {
    cout << "C：继续加油。" << endl;
} else {
    cout << "D：再复习一下。" << endl;
}`
      },
      {
        type: 'note',
        title: '顺序很重要',
        text: '如果先判断 <code>score >= 60</code>，那么 95 分也会被分到 C 档。所以条件要从高到低写，让更严格的条件先被检查。'
      },
      { type: 'h2', text: '组合条件' },
      {
        type: 'code',
        file: 'two-conditions.cpp',
        output: '可以玩滑梯！',
        code: `int age = 11;
double height = 1.35;

if (age >= 6 && height >= 1.2) {
    cout << "可以玩滑梯！" << endl;
} else {
    cout << "再长大一点点吧。" << endl;
}`
      },
      {
        type: 'tip',
        title: '花括号是好习惯',
        text: '哪怕花括号里只有一行，也建议写出来。以后要加更多语句时，不容易漏掉；读代码时，也能一眼看出哪几行属于这个分支。'
      },
      {
        type: 'warn',
        title: 'if 后面不要随便加分号',
        text: '<code>if (score &gt;= 60);</code> 这个分号会让 if 的「身体」变成空语句，后面的花括号就和 if 没关系了。程序能编译，但逻辑会奇怪。'
      },
      {
        type: 'warn',
        title: '再把 = 和 == 记一遍',
        text: '判断是否相等用两个等号：<code>if (score == 100)</code>。写成 <code>if (score = 100)</code> 会把 100 赋给 score，而且条件永远成立。'
      },
      {
        type: 'quiz',
        question: '下面哪一行会让 if 的判断失效？',
        options: [
          '<code>if (x &gt; 0) {</code>',
          '<code>if (x &gt; 0); {</code>',
          '<code>if (x &gt; 0 && y &lt; 3) {</code>',
          '<code>if (x == 0) {</code>'
        ],
        answer: 1,
        explain: '多出来的分号让 if 后面跟了一个空语句，花括号里的内容就不受条件控制了。'
      },
      {
        type: 'exercise',
        title: '奇数还是偶数',
        task: '读取一个整数，用 <code>if</code> 判断它是奇数还是偶数。',
        hint: '一个数除以 2 的余数是 0，它就是偶数：<code>n % 2 == 0</code>。',
        answerCode: `int n;
cin >> n;

if (n % 2 == 0) {
    cout << n << " 是偶数。" << endl;
} else {
    cout << n << " 是奇数。" << endl;
}`
      },
      {
        type: 'takeaways',
        items: [
          '<code>if</code> 的条件成立时执行花括号里的代码。',
          '<code>else</code> 处理「否则」的情况，<code>else if</code> 处理更多分支。',
          '多分支要从严格到宽松排列。',
          'if 后面不要多写分号，比较相等用 <code>==</code>。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 6 章
     ====================================================================== */
  {
    id: 'c6',
    slug: 'loops',
    num: '06',
    title: '循环：让电脑重复干活',
    subtitle: 'for 与 while，把重复交给电脑',
    minutes: 16,
    level: 2,
    keywords: ['for', 'while', '循环', '死循环', '累加', 'i++', '次数'],
    goals: [
      '看懂 for 循环的三个部分',
      '用 while 处理「不知道要重复几次」的情况',
      '用循环完成累加和批量输出'
    ],
    blocks: [
      { type: 'h2', text: '为什么要循环？' },
      {
        type: 'p',
        text: '如果要输出 1 到 100，难道要写 100 行 <code>cout</code>？电脑最擅长做重复的事，只要告诉它「从 1 开始，每次加 1，到 100 停下」，它就会自己完成。'
      },
      {
        type: 'code',
        file: 'count.cpp',
        output: '1 2 3 4 5 ',
        code: `for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
cout << endl;`
      },
      {
        type: 'p',
        text: '<code>for</code> 的小括号里有三段，用两个分号分开：<strong>起点、条件、步进</strong>。上面的例子是：<code>int i = 1</code>（从 1 开始）、<code>i &lt;= 5</code>（只要不超过 5 就继续）、<code>i++</code>（每轮加 1）。'
      },
      {
        type: 'table',
        headers: ['位置', '代码', '作用'],
        rows: [
          ['第一段', 'int i = 1', '起点：循环变量从 1 开始'],
          ['第二段', 'i <= 5', '条件：成立就进入循环'],
          ['第三段', 'i++', '步进：每跑完一轮加 1']
        ]
      },
      { type: 'h2', text: 'while：条件成立就一直做' },
      {
        type: 'p',
        text: '当不知道要循环几次、只知道「做到什么时候为止」时，<code>while</code> 更顺手。下面这个小程序不断读入数字，直到输入 0 为止，并计算总和。'
      },
      {
        type: 'code',
        file: 'sum-until-zero.cpp',
        output: '3 5 2 0\n总和是 10',
        code: `int number, total = 0;

cin >> number;
while (number != 0) {
    total += number;
    cin >> number;
}

cout << "总和是 " << total << endl;`
      },
      {
        type: 'p',
        text: '<code>total += number;</code> 就是 <code>total = total + number;</code> 的简写。循环会一直读入新数字，直到读到 0，条件不成立才离开。'
      },
      {
        type: 'warn',
        title: '小心死循环',
        text: '如果循环变量永远不改变，或者条件永远成立，程序就会卡住。比如 <code>for (int i = 1; i &lt;= 5; )</code> 忘了写 <code>i++</code>，或者 <code>while (true)</code> 里面没有 <code>break</code>。遇到程序不输出、像卡住一样，先检查循环条件。'
      },
      { type: 'h2', text: '用循环做累加' },
      {
        type: 'code',
        file: 'sum-1-100.cpp',
        output: '1 到 100 的和是 5050',
        code: `int sum = 0;

for (int i = 1; i <= 100; i++) {
    sum += i;
}

cout << "1 到 100 的和是 " << sum << endl;`
      },
      {
        type: 'note',
        title: '循环变量 i 的命名',
        text: '<code>i</code> 是循环变量最常用的名字（index 的首字母）。嵌套循环时，内层常用 <code>j</code>、<code>k</code>。名字虽短，但在循环里约定俗成，大家一看就懂。'
      },
      {
        type: 'quiz',
        question: '<code>for (int i = 0; i &lt; 3; i++)</code> 会让循环体执行几次？',
        options: ['2 次', '3 次', '4 次', '无限次'],
        answer: 1,
        explain: 'i 依次取 0、1、2，共 3 个值，所以执行 3 次。当 i 变成 3 时，条件 <code>i &lt; 3</code> 不成立，循环结束。'
      },
      {
        type: 'exercise',
        title: '打印 1 到 10 的偶数',
        task: '用循环和 <code>if</code> 输出 1 到 10 之间所有的偶数，用空格隔开。',
        hint: '循环从 1 到 10，如果 <code>i % 2 == 0</code> 就输出 i。',
        answerCode: `for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        cout << i << " ";
    }
}
cout << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '<code>for</code> 适合次数已知的循环：起点、条件、步进。',
          '<code>while</code> 适合「做到某个条件为止」的循环。',
          '循环变量要在循环里改变，否则容易死循环。',
          '<code>sum += i</code> 这类简写让累加更简洁。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 7 章
     ====================================================================== */
  {
    id: 'c7',
    slug: 'arrays',
    num: '07',
    title: '数组：一排编号的小抽屉',
    subtitle: '把一组数据整整齐齐地放好',
    minutes: 15,
    level: 3,
    keywords: ['数组', '下标', '越界', '遍历', 'sizeof', 'const', '最高分'],
    goals: [
      '声明数组并用下标访问元素',
      '用 for 循环遍历一组数据',
      '理解下标从 0 开始和越界的危险'
    ],
    blocks: [
      { type: 'h2', text: '一个盒子放一组数据' },
      {
        type: 'p',
        text: '如果有 5 个同学的成绩，定义 5 个变量太麻烦。数组就像<strong>一排编了号的抽屉</strong>：它们类型相同、排在一起，用一个名字就能管理。'
      },
      {
        type: 'code',
        file: 'array.cpp',
        output: '第 1 个成绩：90\n改完后第 2 个成绩：88\n第 3 个成绩：100',
        code: `int scores[3] = {90, 85, 100};

cout << "第 1 个成绩：" << scores[0] << endl;
scores[1] = 88;
cout << "改完后第 2 个成绩：" << scores[1] << endl;
cout << "第 3 个成绩：" << scores[2] << endl;`
      },
      {
        type: 'p',
        text: '注意：数组的编号叫<strong>下标</strong>，而且<strong>从 0 开始</strong>。三个元素的数组，下标是 0、1、2。第 1 个抽屉的编号是 0，这一点初学者最容易记错。'
      },
      {
        type: 'table',
        headers: ['下标', '0', '1', '2'],
        rows: [
          ['存放的成绩', '90', '85', '100']
        ]
      },
      { type: 'h2', text: '用循环遍历数组' },
      {
        type: 'p',
        text: '<code>for</code> 和数组是天生一对：让循环变量 <code>i</code> 从 0 走到最后一个下标，就能依次处理每个元素。'
      },
      {
        type: 'code',
        file: 'array-loop.cpp',
        output: '总分 454，平均 90 分\n最高分 100',
        code: `const int N = 5;
int scores[N] = {88, 92, 79, 95, 100};
int sum = 0;
int maxScore = scores[0];

for (int i = 0; i < N; i++) {
    sum += scores[i];
    if (scores[i] > maxScore) {
        maxScore = scores[i];
    }
}

cout << "总分 " << sum << "，平均 " << sum / N << " 分" << endl;
cout << "最高分 " << maxScore << endl;`
      },
      {
        type: 'note',
        title: '为什么用 const int N？',
        text: '把数组长度存进 <code>const N</code>，循环条件和数组声明都用它。以后想把 5 个成绩改成 10 个，只要改一处，不容易漏。'
      },
      {
        type: 'warn',
        title: '下标越界很危险',
        text: '长度为 5 的数组，合法下标只有 0 到 4。访问 <code>scores[5]</code> 或 <code>scores[-1]</code> 就是<strong>越界</strong>。C++ 不会自动帮你检查，可能读到乱七八糟的值，甚至让程序崩溃。'
      },
      {
        type: 'tip',
        title: '初始化的两种写法',
        text: '可以在定义时一次填满：<code>int a[3] = {1, 2, 3};</code>；也可以只声明，之后再逐个赋值：<code>int a[3]; a[0] = 1;</code>。没有赋值的元素是随机值，使用前要先写入。'
      },
      {
        type: 'quiz',
        question: '声明 <code>int a[4];</code> 后，合法的下标是哪些？',
        options: ['1 到 4', '0 到 4', '0 到 3', '1 到 3'],
        answer: 2,
        explain: '长度为 4 的数组，下标从 0 开始，最后一个下标是 4 - 1 = 3，所以合法范围是 0 到 3。'
      },
      {
        type: 'exercise',
        title: '找最低分',
        task: '有 5 个成绩，用循环找出其中的最低分并输出。',
        hint: '先把 <code>scores[0]</code> 当作最低分，遍历时遇到更小的就更新。',
        answerCode: `const int N = 5;
int scores[N] = {88, 92, 79, 95, 100};
int minScore = scores[0];

for (int i = 1; i < N; i++) {
    if (scores[i] < minScore) {
        minScore = scores[i];
    }
}
cout << "最低分：" << minScore << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '数组用同一个名字保存一组同类型数据。',
          '下标从 0 开始，长度 N 的数组最后一个下标是 N - 1。',
          '用 <code>for</code> 循环遍历数组，注意条件用 <code>i &lt; N</code>。',
          '不要访问数组范围之外的下标。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 8 章
     ====================================================================== */
  {
    id: 'c8',
    slug: 'strings',
    num: '08',
    title: '字符串：文字的秘密',
    subtitle: '拼接、取字、比较，和文字做朋友',
    minutes: 15,
    level: 3,
    keywords: ['string', 'length', '拼接', '下标', 'find', 'getline', '遍历', '字符'],
    goals: [
      '用 string 保存和处理一段文字',
      '拼接字符串、取出单个字符',
      '用范围 for 遍历字符串中的字符'
    ],
    blocks: [
      { type: 'h2', text: 'string：文字的收纳盒' },
      {
        type: 'p',
        text: '<code>string</code> 是 C++ 里专门装文字的盒子，和 <code>int</code> 一样，也可以定义、赋值、输出。使用它需要 <code>#include &lt;string&gt;</code>。'
      },
      {
        type: 'code',
        file: 'string-basic.cpp',
        output: '你好，Coco！\n这个名字有 4 个字母。',
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Coco";
    cout << "你好，" << name << "！" << endl;
    cout << "这个名字有 " << name.length() << " 个字母。" << endl;
    return 0;
}`
      },
      {
        type: 'p',
        text: '<code>name.length()</code> 会返回字符串的长度（字符个数）。注意它是「成员函数」，名字后面要跟一对小括号。'
      },
      { type: 'h2', text: '用 + 把文字拼起来' },
      {
        type: 'code',
        file: 'concat.cpp',
        output: 'C++ 笔记',
        code: `string first = "C++";
string second = "笔记";
string title = first + " " + second;

cout << title << endl;  // C++ 笔记`
      },
      {
        type: 'note',
        title: '字符串和字符的区别',
        text: '<code>string</code> 用双引号，可以装很多字：<code>"hello"</code>；<code>char</code> 用单引号，只能装一个字符：<code>\'h\'</code>。两个符号不要混用。'
      },
      { type: 'h2', text: '用下标取出一个字符' },
      {
        type: 'p',
        text: '字符串也像数组，可以用下标访问单个字符，下标同样从 0 开始。'
      },
      {
        type: 'code',
        file: 'letters.cpp',
        output: 'c\ne\ncode 的第一位是 c',
        code: `string word = "code";

cout << word[0] << endl;  // c
cout << word[3] << endl;  // e
cout << word << " 的第一位是 " << word[0] << endl;`
      },
      { type: 'h2', text: '比较字符串' },
      {
        type: 'p',
        text: '两个字符串可以直接用 <code>==</code> 比较内容是否完全相同。比如判断用户输入的是不是 <code>"yes"</code>。'
      },
      {
        type: 'code',
        file: 'compare.cpp',
        output: '请输入 yes 或 no：yes\n太好了！',
        code: `string answer;
cout << "请输入 yes 或 no：";
cin >> answer;

if (answer == "yes") {
    cout << "太好了！" << endl;
} else {
    cout << "没关系，再试试。" << endl;
}`
      },
      { type: 'h2', text: '逐个字符地检查' },
      {
        type: 'p',
        text: '范围 for 是遍历字符串的好帮手，读作「对于 word 里的每一个字符 c」。'
      },
      {
        type: 'code',
        file: 'count-a.cpp',
        output: '字母 a 出现了 3 次。',
        code: `string word = "banana";
int count = 0;

for (char c : word) {
    if (c == 'a') {
        count++;
    }
}

cout << "字母 a 出现了 " << count << " 次。" << endl;`
      },
      {
        type: 'warn',
        title: '中文长度不是看上去那样',
        text: '一个汉字在 UTF-8 编码里通常占 3 个字节，<code>length()</code> 数的是字节数，所以 <code>"小星".length()</code> 不是 2。初学阶段先用英文字母和数字练习，等学了编码再处理中文。'
      },
      {
        type: 'tip',
        title: '读取带空格的一整行',
        text: '<code>cin &gt;&gt; name</code> 遇到空格就会停。想读入一整句话，用 <code>getline(cin, sentence);</code>，它会把整行都收进字符串。'
      },
      {
        type: 'quiz',
        question: '把两个字符串连接起来，用哪个运算符？',
        options: ['<code>&amp;</code>', '<code>+</code>', '<code>*</code>', '<code>==</code>'],
        answer: 1,
        explain: '<code>string</code> 重载了 <code>+</code>，所以 <code>"C" + "+"</code> 会得到 <code>"C+"</code>。<code>==</code> 用来比较是否相等。'
      },
      {
        type: 'exercise',
        title: '数一数字母 r',
        task: '给定字符串 <code>"strawberry"</code>，统计字母 r 出现了几次。',
        hint: '用范围 for 遍历每个字符，遇到 <code>\'r\'</code> 就让计数器加 1。',
        answerCode: `string word = "strawberry";
int count = 0;

for (char c : word) {
    if (c == 'r') {
        count++;
    }
}
cout << "字母 r 出现了 " << count << " 次。" << endl;`
      },
      {
        type: 'takeaways',
        items: [
          '<code>string</code> 保存一串文字，需要 <code>#include &lt;string&gt;</code>。',
          '<code>length()</code> 取长度，<code>+</code> 拼接字符串，<code>[i]</code> 取单个字符。',
          '字符串能用 <code>==</code> 比较内容。',
          '范围 for 可以逐个处理字符串里的字符。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 9 章
     ====================================================================== */
  {
    id: 'c9',
    slug: 'functions',
    num: '09',
    title: '函数：自己造一块积木',
    subtitle: '把常用步骤打包，让代码更整洁',
    minutes: 16,
    level: 3,
    keywords: ['函数', 'return', 'void', '参数', '返回值', '调用', 'add', '作用域'],
    goals: [
      '定义和调用一个带返回值的函数',
      '用 void 函数执行只做事、不返回结果的任务',
      '理解参数和返回值的作用'
    ],
    blocks: [
      { type: 'h2', text: '把重复的步骤装进积木' },
      {
        type: 'p',
        text: '如果一段代码要做很多次，复制粘贴会让程序越来越长。函数就像一块<strong>自己造的乐高积木</strong>：把步骤包起来，起一个名字，以后需要时叫名字就行。'
      },
      {
        type: 'code',
        file: 'add.cpp',
        output: '3 + 5 = 8\n10 + 20 = 30',
        code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << "3 + 5 = " << add(3, 5) << endl;
    cout << "10 + 20 = " << add(10, 20) << endl;
    return 0;
}`
      },
      {
        type: 'list',
        ordered: true,
        items: [
          '<code>int</code> —— 返回类型：这个函数会把一个整数交回来。',
          '<code>add</code> —— 函数名：调用时用它。',
          '<code>(int a, int b)</code> —— 参数表：调用时要递进来两个整数，分别叫 a 和 b。',
          '<code>{ return a + b; }</code> —— 函数体：真正干活的地方，<code>return</code> 把结果交回去。'
        ]
      },
      {
        type: 'p',
        text: '在 <code>main</code> 里写 <code>add(3, 5)</code>，就像把 3 和 5 递给积木，积木算完把 8 还回来。这个动作叫<strong>调用</strong>。'
      },
      { type: 'h2', text: 'void：只做事，不交结果' },
      {
        type: 'p',
        text: '有些函数只负责打印或修改，不需要返回任何值，这时返回类型写 <code>void</code>（空）。'
      },
      {
        type: 'code',
        file: 'say-hi.cpp',
        output: '你好，小星！\n你好，Coco！',
        code: `#include <iostream>
#include <string>
using namespace std;

void sayHi(string name) {
    cout << "你好，" << name << "！" << endl;
}

int main() {
    sayHi("小星");
    sayHi("Coco");
    return 0;
}`
      },
      {
        type: 'p',
        text: '调用 <code>sayHi("小星")</code> 时，字符串被复制进参数 <code>name</code>，函数体打印一行字，然后回到 main 继续往下执行。'
      },
      { type: 'h2', text: '函数让判断也变简单' },
      {
        type: 'code',
        file: 'even.cpp',
        output: '7 是偶数吗？false\n8 是偶数吗？true',
        code: `bool isEven(int n) {
    return n % 2 == 0;
}

int main() {
    cout << boolalpha;
    cout << "7 是偶数吗？" << isEven(7) << endl;
    cout << "8 是偶数吗？" << isEven(8) << endl;
    return 0;
}`
      },
      {
        type: 'tip',
        title: '函数的三条好习惯',
        text: '一、先定义后使用；二、名字用动词开头，如 <code>add</code>、<code>isEven</code>；三、一个函数只做一件事，短小好读。'
      },
      {
        type: 'warn',
        title: '有返回类型的函数一定要 return',
        text: '如果返回类型不是 <code>void</code>，却忘了写 <code>return</code>，调用者拿到的值是不确定的，编译器通常会警告。看到 warning，别忽略它。'
      },
      {
        type: 'quiz',
        question: '一个函数只打印文字、不返回任何值，返回类型应该写什么？',
        options: ['<code>int</code>', '<code>string</code>', '<code>void</code>', '<code>bool</code>'],
        answer: 2,
        explain: '<code>void</code> 表示「没有返回值」。这样的函数只执行动作，不能放在 <code>cout</code> 的右边当值使用。'
      },
      {
        type: 'exercise',
        title: '写一个面积函数',
        task: '定义函数 <code>area(width, height)</code>，返回长方形的面积，然后在 main 里调用它。',
        hint: '面积 = 长 × 宽，两个参数都用 <code>double</code>，返回类型也用 <code>double</code>。',
        answerCode: `double area(double width, double height) {
    return width * height;
}

int main() {
    cout << "面积是 " << area(3.5, 2.0) << endl;
    return 0;
}`
      },
      {
        type: 'takeaways',
        items: [
          '函数把一段步骤打包，用名字反复调用。',
          '定义包含返回类型、函数名、参数表和函数体。',
          '<code>return</code> 把结果交回调用处。',
          '只做事不返回值的函数，返回类型写 <code>void</code>。'
        ]
      }
    ]
  },

  /* ======================================================================
     第 10 章
     ====================================================================== */
  {
    id: 'c10',
    slug: 'guess-game',
    num: '10',
    title: '综合实战：猜数字小游戏',
    subtitle: '把变量、循环、分支、随机数全部用上',
    minutes: 20,
    level: 3,
    keywords: ['猜数字', 'rand', 'srand', '随机数', '综合项目', 'while', '游戏'],
    goals: [
      '把前面九章的知识组合成一个完整程序',
      '用随机数生成一个秘密数字',
      '读懂并改造一个 30 行左右的小游戏'
    ],
    blocks: [
      { type: 'h2', text: '今天做一个能玩的小程序' },
      {
        type: 'p',
        text: '游戏规则很简单：电脑心里想一个 1 到 100 之间的数字，你来猜。每次猜完，电脑会告诉你「大了」还是「小了」，直到猜对为止。这个项目会用到变量、输入输出、循环、分支、随机数——正好是前面九章的总复习。'
      },
      { type: 'h2', text: '先请出随机数' },
      {
        type: 'p',
        text: 'C++ 用 <code>rand()</code> 生成伪随机数。为了让每次运行的结果不同，先用当前时间给随机数「播种」：<code>srand(time(0));</code>。然后用 <code>rand() % 100 + 1</code> 得到 1 到 100 的整数。'
      },
      {
        type: 'list',
        items: [
          '<code>#include &lt;cstdlib&gt;</code> —— 提供 <code>rand</code> 和 <code>srand</code>。',
          '<code>#include &lt;ctime&gt;</code> —— 提供 <code>time</code>，用来获取当前时间。',
          '<code>srand(time(0));</code> —— 用时间当种子，让每次的随机数不一样。',
          '<code>rand() % 100 + 1</code> —— 余数范围是 0 到 99，加 1 后就变成 1 到 100。'
        ]
      },
      { type: 'h2', text: '完整的游戏代码' },
      {
        type: 'code',
        file: 'guess.cpp',
        output: '我想好了一个 1~100 的数字，来猜猜看！\n请输入你的猜测：50\n小了！往上猜。\n请输入你的猜测：75\n大了！往下猜。\n请输入你的猜测：63\n猜对啦！你用了 3 次。',
        code: `#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand((unsigned)time(0));
    int secret = rand() % 100 + 1;
    int guess = 0;
    int tries = 0;

    cout << "我想好了一个 1~100 的数字，来猜猜看！" << endl;

    while (guess != secret) {
        cout << "请输入你的猜测：";
        cin >> guess;
        tries++;

        if (guess > secret) {
            cout << "大了！往下猜。" << endl;
        } else if (guess < secret) {
            cout << "小了！往上猜。" << endl;
        } else {
            cout << "猜对啦！你用了 " << tries << " 次。" << endl;
        }
    }

    return 0;
}`
      },
      { type: 'h2', text: '它是怎么跑起来的？' },
      {
        type: 'list',
        ordered: true,
        items: [
          '程序启动，播种随机数，生成 <code>secret</code>（1 到 100）。',
          '<code>guess</code> 先设为 0，保证第一次能进入循环。',
          '<code>while (guess != secret)</code>：只要还没猜对，就继续。',
          '读入猜测、次数加 1，用 <code>if / else if / else</code> 给出提示。',
          '猜对后循环条件不成立，程序输出结果并结束。'
        ]
      },
      {
        type: 'note',
        title: '为什么 guess 要先设成 0？',
        text: '如果 <code>guess</code> 没有初始值，它可能是任何数。万一开始就碰巧等于 secret，循环一次都不会执行。先设一个不可能的值，能保证游戏至少问一次。'
      },
      {
        type: 'warn',
        title: '随机数不是真随机',
        text: '<code>rand()</code> 生成的是伪随机数：看起来乱，其实由种子决定。同一个种子会得到同一串数字。用 <code>time(0)</code> 做种子，每次运行的时间不同，结果也就不同。'
      },
      { type: 'h2', text: '三个改造挑战' },
      {
        type: 'list',
        items: [
          '把范围改成 1 到 50，看看平均几次能猜中。',
          '限制最多猜 7 次，超过就公布答案并结束。',
          '记录历史猜测，每次提示时顺便显示「上一次猜的是几」。'
        ]
      },
      {
        type: 'quiz',
        question: '<code>rand() % 100 + 1</code> 能得到的数字范围是？',
        options: ['0 到 99', '1 到 99', '1 到 100', '0 到 100'],
        answer: 2,
        explain: '<code>rand() % 100</code> 得到 0 到 99，再加 1 就是 1 到 100，两端都包含。'
      },
      {
        type: 'exercise',
        title: '挑战：最多猜 7 次',
        task: '在完整代码的基础上，把循环条件改成「没猜对并且次数不到 7 次」，次数用完时公布答案。',
        hint: '循环条件用 <code>guess != secret &amp;&amp; tries &lt; 7</code>。循环结束后，如果还没猜对，就输出正确答案。',
        answerCode: `while (guess != secret && tries < 7) {
    cout << "请输入你的猜测：";
    cin >> guess;
    tries++;

    if (guess > secret) {
        cout << "大了！往下猜。" << endl;
    } else if (guess < secret) {
        cout << "小了！往上猜。" << endl;
    }
}

if (guess == secret) {
    cout << "猜对啦！你用了 " << tries << " 次。" << endl;
} else {
    cout << "次数用完啦，答案是 " << secret << "。" << endl;
}`
      },
      {
        type: 'note',
        title: '学完之后，往哪里走？',
        text: '接下来可以认识结构体（把一组相关信息打包）、文件读写（把数据保存下来）、排序与查找（让程序更聪明）。但别忘了：多写、多改、多调试，才是真正学会编程的秘诀。'
      },
      {
        type: 'takeaways',
        items: [
          '把输入、分支、循环组合起来，就能写出可交互的小程序。',
          '<code>rand() % n + 1</code> 可以生成 1 到 n 的随机数。',
          '<code>srand(time(0))</code> 让每次运行的随机数不同。',
          '循环条件可以同时检查多个事情，用 <code>&amp;&amp;</code> 连接。'
        ]
      }
    ]
  }
];

window.COURSE = COURSE;

