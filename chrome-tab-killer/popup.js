$(document).ready(function () {

  const DEFAULTS = {
    maxTabs: 15,
    whiteList: ['chrome://*']
  };

  let settings = {};

  function loadOptions() {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      settings = items;
      $('#maxTabs').val(settings.maxTabs);
      buildWhiteListTable(settings.whiteList);
    });
  }

  function saveOption(key, value) {
    chrome.storage.sync.set({ [key]: value }, () => {
      settings[key] = value;
      $('#status').removeClass('invisible').css('opacity', '100')
        .html('Saving…').delay(50).animate({ opacity: 0 });
    });
  }

  function buildWhiteListTable(list) {
    const $tbody = $('table#white-list tbody').empty();
    list.forEach((pattern, idx) => {
      const $tr = $('<tr>');
      $tr.append($('<td>').text(pattern));
      const $remove = $('<a href="#" class="deleteLink">Remove</a>');
      $remove.on('click', function () {
        list.splice(idx, 1);
        saveOption('whiteList', list);
        buildWhiteListTable(list);
      });
      $tr.append($('<td>').append($remove));
      $tbody.append($tr);
    });
  }

  // --- Event wiring ---

  $('#maxTabs').on('keyup', _.debounce(function () {
    const val = parseInt($(this).val(), 10);
    if (!isNaN(val) && val > 0 && val <= 200) {
      saveOption('maxTabs', val);
    }
  }, 200));

  $('#white-list-add').on('click', function () {
    const $input = $('#white-list-input');
    const val = $input.val().trim();
    if (!val) return;
    const list = [...settings.whiteList, val];
    saveOption('whiteList', list);
    buildWhiteListTable(list);
    $input.val('').focus();
  });

  $('#white-list-input').on('input', function () {
    const disabled = !$(this).val().trim();
    $('#white-list-add').prop('disabled', disabled);
  });

  loadOptions();
});