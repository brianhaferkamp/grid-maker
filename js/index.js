function buildGrid() {
  
  var gridItems = '';
  var gridWrapClass = '';
  var gridCol = '';
  var gridRow = '';
  var gridGap = '';
  var gridWidth = '';
  
  
  $('.grid-items-number').on('keydown', function(e) {
    var $this = $(this);
    if (e.keyCode !== 9) {
      $('#grid').html('');
    }
  });
     
  $('.grid-items-number').on('keyup', function() {
    var $this = $(this);
    gridItems = $this.val();
    
    // build grid items
    for (var i=0; i<gridItems; i++) {
      $('#grid').append('<article class="grid-item"></article>');
    }
    console.log('Grid Items = ' + gridItems);
  });
  
  
  // gather inputs
  
  $('.grid-wrapper-class').on('blur', function() {
    var $this = $(this);
    gridWrapClass = $this.val();
    $('#grid').addClass('' + gridWrapClass + '');
    console.log('Grid Wrapper Class = .' + gridWrapClass);
  });

  $('.grid-cols').on('blur', function() {
    var $this = $(this);
    gridCol = $this.val();
    $('.' + gridWrapClass).css({
      'grid-template-columns' : '' + gridCol + ''
    });
    console.log('Grid Columns = ' + gridCol);
  });
  
  
  // quick columns buttons
  
  $('.one-column').on('click', function() {
      gridCol = '1fr';
      $('.grid-cols').val(gridCol);
      $('.' + gridWrapClass).css({
      'grid-template-columns' : '' + gridCol + ''
      });
      console.log('Grid Columns = ' + gridCol); 
  });
  
  $('.two-column').on('click', function() {
      gridCol = '1fr 1fr';
      $('.grid-cols').val(gridCol);
      $('.' + gridWrapClass).css({
      'grid-template-columns' : '' + gridCol + ''
      });
      console.log('Grid Columns = ' + gridCol); 
  });
  
  $('.three-column').on('click', function() {
      gridCol = '1fr 1fr 1fr';
      $('.grid-cols').val(gridCol);
      $('.' + gridWrapClass).css({
      'grid-template-columns' : '' + gridCol + ''
      });
      console.log('Grid Columns = ' + gridCol); 
  });
 

  $('.grid-rows').on('blur', function() {
    var $this = $(this);
    gridRow = $this.val();
    $('.' + gridWrapClass).css({
      'grid-template-rows' : '' + gridRow + ''
    });
    console.log('Grid Rows = ' + gridRow);
  });

  $('.grid-gap').on('blur', function() {
    var $this = $(this);
    gridGap = $this.val();
    $('.' + gridWrapClass).css({
      'grid-gap' : '' + gridGap + ''
    });
    console.log('Grid Gap = ' + gridGap);
  });

  // $('.grid-width').on('blur', function() {
  //   var $this = $(this);
  //   gridWidth = $this.val();
  //   $('.' + gridWrapClass).css({
  //     'width' : '' + gridWidth + ''
  //   });
  //   console.log('Grid Width = ' + gridWidth);
  // });
  
  // reset inputs on clear
  $('.form-reset').on('click', function() {
    $('.form input').val('');
    $('.grid-item').remove();
    $('#grid').removeClass(gridWrapClass).css({
      'grid-template-columns' : 'repeat(4, 1fr)',
      'grid-template-rows' : 'auto',
      'grid-gap' : '1rem',
      // 'width' : '100%'
    });
    
    $('.html-output').html('');
    $('.css code').html('');
    $('.html, .css').addClass('hide');
    
  });
  
  $('.form-get-code').on('click', function() { 
    $('.html-output').html('');
    $('.css code').html('');
    $('.html-output .' + gridWrapClass).css({
      'grid-template-columns' : 'repeat(4, 1fr)',
      'grid-template-rows' : 'auto',
      'grid-gap' : '1rem',
      // 'width' : '100%'
    });
    // process HTML
    var outputCode = $('#grid').clone().html();
    $('.html-output').append(outputCode);
    $('.html-output .grid-item').wrapAll('<section id="grid" class="' + gridWrapClass + '" />');
    outputCode = $('.html-output').html();
    var safe = outputCode.replace(/</g,"&lt;").replace(/>/g,"&gt;");
    $('.html-output').append(safe);
    $('.html-output .' + gridWrapClass).css({
      'grid-template-columns' : gridCol,
      'grid-template-rows' : gridRow,
      'grid-gap' : gridGap,
      // 'width' : gridWidth
    });
    
    
    
    // process CSS
    var outputGrid = $('.html-output .' + gridWrapClass);
    var outputGridCols = outputGrid.css('grid-template-columns');
    console.log(outputGridCols);
    var outputGridRows = outputGrid.css('grid-template-rows');
    console.log(outputGridRows);
    var outputGridGap = outputGrid.css('grid-gap');
    console.log(outputGridGap);
    var outputGridWidth = outputGrid.css('width');
    console.log(outputGridWidth);
    
    $('.css code').append('\.' + gridWrapClass + ' \{display: grid; grid-template-columns: ' + outputGridCols + '; grid-template-rows: ' + outputGridRows + '; grid-gap: ' + outputGridGap + '\}');
    
    $('.html, .css').removeClass('hide');
    var outputContainer = $('.code-output');
    $(window).scrollTop(outputContainer.offset().top);
  });
  
}

buildGrid();


// Popup

$('label i').on('click', function() {
  var $this = $(this);
  $('.popup').removeClass('hide');
  
  if ($this.is('.help-grid-items-number')) {
    $('.popup-text').html('<h2>Number of Grid Items</h2><p>Type in the total number of individual grid items you want to display.</p>');
  } else if ($this.is('.help-grid-wrapper-class')) {
    $('.popup-text').html('<h2>Grid Wrapper Class</h2><p><strong>This value is required.</strong> Type a unique CSS class name that will be used for the container element that holds the grid items. Only type the name. There is no need to add a period at the beginning of the class name.</p><p>Examples:</p><p><code>grid</code><br><code>grid-wrapper</code><br><code>gridContainer</code></p>');
  } else if ($this.is('.help-grid-cols')) {
    $('.popup-text').html('<h2>Grid Columns</h2><p>How many columns do you want for your grid? Type in the column structure you want using the same values you would use in the <code>grid-template-columns</code> property. You can also click on the quick column buttons to choose a basic one-, two-, or three-column grid.</p><p>Example of three column grid with equal columns:</p><p><code>1fr 1fr 1fr</code><br><code>repeat(3, 1fr)</code></p>');
  } else if ($this.is('.help-grid-rows')) {
    $('.popup-text').html('<h2>Grid Rows</h2><p>CSS Grid will automatically lay out the grid items using the number of columns you specified. If you need a specific row structure, type in the row structure you want using the same values you would use in the <code>grid-template-rows</code> property. The default value is <code>auto</code>.</p><p>Example of grid with equal height rows:</p><p><code>1fr 1fr 1fr</code><br><code>repeat(3, 1fr)</code></p>');
  } else if ($this.is('.help-grid-gap')) {
    $('.popup-text').html('<h2>Grid Gap</h2><p>Type in the amount of gap (gutter) you want between your grid items. Use the same values that you would for the <code>grid-gap</code> property. If you enter one value, the <code>grid-row-gap</code> and <code>grid-column-gap</code> will be the same size. For different widths, type two values (with no comma separating them). The first for the row gap and second for the column gap.</p><p>Examples:</p><p><code>1em (row and column gaps equal)</code><br><code>1em 2em (row and column gaps unequal)</code></p>');
  } else if ($this.is('.help-grid-width')) {
    $('.popup-text').html('<h2>Grid Width</h2><p>This value determines the overall size of the grid container. You can type any unit of measurement that can be used in the <code>width</code> property.</p><p>Examples:</p><p><code>100%</code><br><code>25em</code><br><code>1200px</code></p>');
  }
  
  $('.popup-inner button').on('click', function() {
    $('.popup').addClass('hide');
  });
  
});