## 分支命名
### master 分支
+ 	master 为主分支，也是用于部署生产环境的分支，确保 master 分支稳定性
+ 	master 分支一般由develop以及hotfix分支合并，任何时间都不能直接修改代码

### develop 分支
+	develop 为开发分支，始终保持最新完成以及bug修复后的代码
+	一般开发的新功能时，feature分支都是基于develop分支下创建的

### feature 分支
+ 	开发新功能时，以develop为基础创建feature分支
+ 	分支命名: feature/ 开头的为特性分支， 命名规则: feature/user_module、 feature/cart_module

### release分支
+ 	release 为预上线分支，发布提测阶段，会release分支代码为基准提测

> ```当有一组 feature 开发完成，首先会合并到 develop 分支，进入提测时，会创建 release分支。如果测试过程中若存在 bug 需要修复，则直接由开发者在 release 分支修复并提交。当测试完成之后，合并 release 分支到 master 和 develop 分支，此时 master 为最新代码，用作上线。```

### hotfix 分支
+ 	分支命名: hotfix/ 开头的为修复分支，它的命名规则与 feature 分支类似
+ 	线上出现紧急问题时，需要及时修复，以master分支为基线，创建hotfix分支，修复完成后，需要合并到master分支和develop分支

> 标题行：50个字符以内，描述主要变更内容

> 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
> 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等

> 他如何解决这个问题? 具体描述解决问题的步骤

> 是否存在副作用、风险?

> 如果需要的话可以添加一个链接到issue地址或者其它文档 