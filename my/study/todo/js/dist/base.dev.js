"use strict";

(function () {
  'use strict';

  var $form_add_task = $('.add-task'),
      $del_task,
      task_list = [];
  init();
  $form_add_task.on('submit', function (e) {
    var new_task = {};
    e.preventDefault();
    var $input = $(this).find('input[name=content]');
    new_task.content = $input.val();
    if (!new_task.content) return; // 存入新task

    if (add_task(new_task)) {
      // render_task_list();
      $input.val(null);
    }
  });

  function listen_task_delete() {
    $del_task.on('click', function (e) {
      var $this = $(this);
      var $item = $this.parent().parent();
      var index = $item.data('index');
      del_task(index);
    });
  }

  function add_task(new_task) {
    // 将新task推入task_list
    task_list.push(new_task); // 更新localStorage

    refresh_task_list();
    return true;
  }

  function del_task(index) {
    // 如果没有index 或 index不存在则返回
    if (index === undefined || !task_list[index]) return;
    task_list.splice(index, 1);
    refresh_task_list();
  }
  /**
   * 刷新数据并渲染模板
   */


  function refresh_task_list() {
    store.set('task-list', task_list);
    render_task_list();
  }

  function init() {
    task_list = store.get('task-list') || [];

    if (task_list.length) {
      render_task_list();
    }
  }

  function render_task_list() {
    var $task_list = $('.task-list');
    $task_list.html('');

    for (var i = 0; i < task_list.length; i++) {
      var $task = render_task_tpl(task_list[i], i);
      $task_list.append($task);
    }

    $del_task = $('.action.delete');
    listen_task_delete();
  }

  function render_task_tpl(data, index) {
    if (!data || index === undefined) return;
    var list_item_tpl = '<div class="task-item" data-index=' + index + '>' + '<span><input type="checkbox" /></span>' + '<span class="task-content">' + data.content + '</span>' + '<span class="fr">' + '<span class="action delete"> delete</span>' + '<span class="action"> detail</span>' + '</span>' + '</div>';
    return $(list_item_tpl);
  }
})();